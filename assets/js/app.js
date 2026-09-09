(function () {
  "use strict";

  const resources = Array.isArray(window.AIP_RESOURCES) ? window.AIP_RESOURCES : [];

  const normalize = (value) => String(value || "").trim().toLowerCase();

  const navToggle = document.querySelector(".nav-toggle");
  const siteNav = document.querySelector(".site-nav");
  if (navToggle && siteNav) {
    navToggle.addEventListener("click", () => {
      const open = siteNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(open));
    });
  }

  const resourceList = document.querySelector("[data-resource-list]");
  if (resourceList) {
    const pageDomain = resourceList.dataset.domain || "";
    const searchInput = document.querySelector("#search");
    const domainFilter = document.querySelector("#domain");
    const typeFilter = document.querySelector("#resourceType");
    const topicFilter = document.querySelector("#planningTopic");
    const methodFilter = document.querySelector("#aiMethod");
    const audienceFilter = document.querySelector("#audience");
    const count = document.querySelector("[data-result-count]");
    const clearButton = document.querySelector("[data-clear-filters]");

    function render(items) {
      if (count) {
        count.textContent = `${items.length} resource${items.length === 1 ? "" : "s"}`;
      }

      if (!items.length) {
        resourceList.innerHTML = `
          <div class="empty-state">
            <h3>No resources to display yet</h3>
            <p>This framework is ready for curated resources. Add records to <code>data/resources.js</code>; matching items will appear here automatically.</p>
          </div>`;
        return;
      }

      resourceList.innerHTML = items.map((item) => {
        const meta = [
          item.domain,
          item.resourceType,
          item.planningTopic,
          item.aiMethod,
          item.institution
        ].filter(Boolean);

        return `
          <article class="resource-item">
            <a class="resource-title" href="${escapeAttr(item.url)}" target="_blank" rel="noopener noreferrer">
              ${escapeHtml(item.title)}
            </a>
            <p class="resource-description">${escapeHtml(item.description)}</p>
            ${meta.length ? `<div class="resource-meta">${meta.map(v => `<span>${escapeHtml(v)}</span>`).join("")}</div>` : ""}
          </article>`;
      }).join("");
    }

    function filteredResources() {
      const query = normalize(searchInput?.value);
      const domain = normalize(pageDomain || domainFilter?.value);
      const resourceType = normalize(typeFilter?.value);
      const planningTopic = normalize(topicFilter?.value);
      const aiMethod = normalize(methodFilter?.value);
      const audience = normalize(audienceFilter?.value);

      return resources.filter((item) => {
        const haystack = normalize([
          item.title,
          item.description,
          item.domain,
          item.resourceType,
          item.planningTopic,
          item.aiMethod,
          item.audience,
          item.contributor,
          item.institution,
          item.geography
        ].join(" "));

        return (
          (!query || haystack.includes(query)) &&
          (!domain || normalize(item.domain) === domain) &&
          (!resourceType || normalize(item.resourceType) === resourceType) &&
          (!planningTopic || normalize(item.planningTopic) === planningTopic) &&
          (!aiMethod || normalize(item.aiMethod) === aiMethod) &&
          (!audience || normalize(item.audience) === audience)
        );
      });
    }

    function refresh() { render(filteredResources()); }

    [searchInput, domainFilter, typeFilter, topicFilter, methodFilter, audienceFilter]
      .filter(Boolean)
      .forEach((el) => {
        el.addEventListener(el.tagName === "INPUT" ? "input" : "change", refresh);
      });

    if (clearButton) {
      clearButton.addEventListener("click", () => {
        [searchInput, domainFilter, typeFilter, topicFilter, methodFilter, audienceFilter]
          .filter(Boolean)
          .forEach((el) => { el.value = ""; });
        refresh();
      });
    }

    refresh();
  }

  const contributionForm = document.querySelector("#contributionForm");
  const statusMessage = document.querySelector("#formStatus");
  if (contributionForm && statusMessage) {
    contributionForm.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!contributionForm.checkValidity()) {
        contributionForm.reportValidity();
        return;
      }
      statusMessage.style.display = "block";
      statusMessage.textContent =
        "Prototype only: the form is complete, but this GitHub Pages version does not store or transmit submissions.";
      statusMessage.focus();
    });
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = String(new Date().getFullYear());

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function escapeAttr(value) {
    return escapeHtml(value);
  }
})();