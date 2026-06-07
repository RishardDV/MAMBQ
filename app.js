/* ============================================
   MAMB Documentation — SPA Controller
   ============================================ */

(function () {
  'use strict';

  // --- Page order for prev/next navigation ---
  const PAGE_ORDER = [
    'intro',
    'guias/instalacion',
    'guias/uso',
    'guias/landing',
    'guias/render',
    'guias/roadmap-ia',
    'arquitectura/overview',
    'arquitectura/frontend',
    'arquitectura/base-de-datos',
    'api/endpoints',
    'api/obras',
  ];

  const PAGE_TITLES = {
    'intro': 'Museo de Arte Moderno de Barranquilla',
    'guias/instalacion': 'Instalacion',
    'guias/uso': 'Guia de uso',
    'guias/landing': 'Landing Page',
    'guias/render': 'Despliegue en Render',
    'guias/roadmap-ia': 'Hoja de ruta — IA',
    'arquitectura/overview': 'Vista general',
    'arquitectura/frontend': 'Frontend',
    'arquitectura/base-de-datos': 'Base de datos',
    'api/endpoints': 'API REST — Vista general',
    'api/obras': 'Obras — Referencia completa',
  };

  let currentPage = 'intro';

  // --- INIT ---
  document.addEventListener('DOMContentLoaded', function () {
    initTheme();
    initSidebar();
    initNavigation();
    initBackToTop();

    // Load page from hash or default to intro
    const hash = window.location.hash.replace('#', '');
    if (hash && document.getElementById('page-' + hash.replace(/\//g, '-'))) {
      navigateTo(hash);
    } else {
      navigateTo('intro');
    }
  });

  // --- THEME ---
  function initTheme() {
    const saved = localStorage.getItem('mamb-docs-theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }

    document.getElementById('theme-toggle').addEventListener('click', function () {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      if (isDark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('mamb-docs-theme', 'light');
        this.textContent = '\u{1F319}';
      } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('mamb-docs-theme', 'dark');
        this.textContent = '\u{2600}\u{FE0F}';
      }
    });

    // Set initial icon
    const btn = document.getElementById('theme-toggle');
    if (document.documentElement.getAttribute('data-theme') === 'dark') {
      btn.textContent = '\u{2600}\u{FE0F}';
    } else {
      btn.textContent = '\u{1F319}';
    }
  }

  // --- SIDEBAR ---
  function initSidebar() {
    // Mobile toggle
    const toggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');
    const backdrop = document.getElementById('sidebar-backdrop');

    toggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      backdrop.classList.toggle('active');
    });

    backdrop.addEventListener('click', function () {
      sidebar.classList.remove('open');
      backdrop.classList.remove('active');
    });

    // Category collapse
    document.querySelectorAll('.sidebar__category-label').forEach(function (label) {
      label.addEventListener('click', function () {
        this.closest('.sidebar__category').classList.toggle('collapsed');
      });
    });
  }

  // --- NAVIGATION ---
  function initNavigation() {
    document.querySelectorAll('[data-page]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var page = this.getAttribute('data-page');
        navigateTo(page);

        // Close mobile sidebar
        document.getElementById('sidebar').classList.remove('open');
        document.getElementById('sidebar-backdrop').classList.remove('active');
      });
    });
  }

  function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.doc-page').forEach(function (p) {
      p.classList.remove('active');
    });

    // Show target page
    var elId = 'page-' + pageId.replace(/\//g, '-');
    var pageEl = document.getElementById(elId);
    if (pageEl) {
      pageEl.classList.add('active');
    }

    currentPage = pageId;

    // Update sidebar active state
    document.querySelectorAll('.sidebar__link').forEach(function (l) {
      l.classList.remove('sidebar__link--active');
    });
    var activeLink = document.querySelector('[data-page="' + pageId + '"]');
    if (activeLink) {
      activeLink.classList.add('sidebar__link--active');
    }

    // Update URL hash
    history.replaceState(null, '', '#' + pageId);

    // Build TOC
    buildToc(pageEl);

    // Build pagination
    buildPagination(pageId);

    // Scroll to top
    window.scrollTo({ top: 0 });

    // Update page title
    var title = PAGE_TITLES[pageId] || 'MAMB';
    document.title = title + ' | MAMB';
  }

  // --- TABLE OF CONTENTS ---
  function buildToc(pageEl) {
    var tocList = document.getElementById('toc-list');
    tocList.innerHTML = '';

    if (!pageEl) return;

    var headings = pageEl.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) {
      document.querySelector('.toc-wrapper').style.display = 'none';
      return;
    }
    document.querySelector('.toc-wrapper').style.display = '';

    headings.forEach(function (h) {
      // Ensure heading has an id
      if (!h.id) {
        h.id = h.textContent.toLowerCase()
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-');
      }

      var li = document.createElement('li');
      var a = document.createElement('a');
      a.className = 'toc__link';
      a.textContent = h.textContent;
      a.href = '#' + h.id;

      a.addEventListener('click', function (e) {
        e.preventDefault();
        h.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // Offset for navbar
        setTimeout(function () {
          window.scrollBy(0, -80);
        }, 300);
      });

      li.appendChild(a);

      if (h.tagName === 'H2') {
        li.dataset.level = '2';
        tocList.appendChild(li);
      } else if (h.tagName === 'H3') {
        // Find or create sub-list under last H2
        var lastH2 = tocList.lastElementChild;
        if (lastH2) {
          var subList = lastH2.querySelector('.toc__list');
          if (!subList) {
            subList = document.createElement('ul');
            subList.className = 'toc__list';
            lastH2.appendChild(subList);
          }
          li.dataset.level = '3';
          subList.appendChild(li);
        } else {
          tocList.appendChild(li);
        }
      } else if (h.tagName === 'H4') {
        // Find last H3 sub-list
        var lastH2Item = tocList.lastElementChild;
        if (lastH2Item) {
          var h2SubList = lastH2Item.querySelector('.toc__list');
          if (h2SubList && h2SubList.lastElementChild) {
            var lastH3 = h2SubList.lastElementChild;
            var h3SubList = lastH3.querySelector('.toc__list');
            if (!h3SubList) {
              h3SubList = document.createElement('ul');
              h3SubList.className = 'toc__list';
              lastH3.appendChild(h3SubList);
            }
            li.dataset.level = '4';
            h3SubList.appendChild(li);
          } else if (h2SubList) {
            h2SubList.appendChild(li);
          }
        }
      }
    });

    // Scroll spy for TOC
    initScrollSpy(pageEl);
  }

  function initScrollSpy(pageEl) {
    var headings = pageEl.querySelectorAll('h2, h3, h4');
    if (headings.length === 0) return;

    function updateActive() {
      var scrollPos = window.scrollY + 100;
      var activeHeading = null;

      headings.forEach(function (h) {
        if (h.offsetTop <= scrollPos) {
          activeHeading = h;
        }
      });

      document.querySelectorAll('.toc__link').forEach(function (l) {
        l.classList.remove('toc__link--active');
      });

      if (activeHeading) {
        var activeLink = document.querySelector('.toc__link[href="#' + activeHeading.id + '"]');
        if (activeLink) {
          activeLink.classList.add('toc__link--active');
        }
      }
    }

    window.removeEventListener('scroll', window._tocScrollHandler);
    window._tocScrollHandler = updateActive;
    window.addEventListener('scroll', updateActive, { passive: true });
  }

  // --- PAGINATION ---
  function buildPagination(pageId) {
    var container = document.getElementById('pagination');
    container.innerHTML = '';

    var idx = PAGE_ORDER.indexOf(pageId);
    if (idx === -1) return;

    if (idx > 0) {
      var prev = PAGE_ORDER[idx - 1];
      var prevLink = document.createElement('a');
      prevLink.className = 'pagination-nav__link';
      prevLink.href = '#' + prev;
      prevLink.innerHTML =
        '<div class="pagination-nav__sublabel">\u00AB Anterior</div>' +
        '<div class="pagination-nav__label">' + PAGE_TITLES[prev] + '</div>';
      prevLink.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(prev);
      });
      container.appendChild(prevLink);
    } else {
      container.appendChild(document.createElement('div'));
    }

    if (idx < PAGE_ORDER.length - 1) {
      var next = PAGE_ORDER[idx + 1];
      var nextLink = document.createElement('a');
      nextLink.className = 'pagination-nav__link pagination-nav__link--next';
      nextLink.href = '#' + next;
      nextLink.innerHTML =
        '<div class="pagination-nav__sublabel">Siguiente \u00BB</div>' +
        '<div class="pagination-nav__label">' + PAGE_TITLES[next] + '</div>';
      nextLink.addEventListener('click', function (e) {
        e.preventDefault();
        navigateTo(next);
      });
      container.appendChild(nextLink);
    }
  }

  // --- BACK TO TOP ---
  function initBackToTop() {
    var btn = document.getElementById('back-to-top');
    window.addEventListener('scroll', function () {
      if (window.scrollY > 400) {
        btn.classList.add('visible');
      } else {
        btn.classList.remove('visible');
      }
    }, { passive: true });

    btn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Hash change ---
  window.addEventListener('hashchange', function () {
    var hash = window.location.hash.replace('#', '');
    if (hash && hash !== currentPage && document.getElementById('page-' + hash.replace(/\//g, '-'))) {
      navigateTo(hash);
    }
  });
})();


