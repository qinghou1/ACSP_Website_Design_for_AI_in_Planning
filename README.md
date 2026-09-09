# AI in Planning Repository — GitHub Pages Framework

https://qinghou1.github.io//ACSP_Website_Design_for_AI_in_Planning/

This package is a static, HTML-oriented prototype for an **AI in Planning Repository** organized around three core domains:

- Education
- Research
- Practice

It is designed for direct deployment to GitHub Pages and does **not** require Node.js, npm, a database, Python, or a build step.

## Included pages

- `index.html` — Home
- `explore.html` — Search and filter all resources
- `education.html` — Education resource list
- `research.html` — Research resource list
- `practice.html` — Practice resource list
- `contribute.html` — Front-end contribution form prototype
- `about.html` — Repository purpose, governance concept, and prototype scope
- `404.html` — Simple not-found page

## Resource display model

Published resources are displayed as:

1. **Clickable title** — opens the original external source in a new browser tab
2. **Short description** — target length: 50–100 words
3. Optional compact metadata line

No internal resource-detail page is used in this prototype.

## Add resources

Open:

`data/resources.js`

The file currently contains an empty array:

```js
window.AIP_RESOURCES = [];
```

Add one object per approved resource. The file includes a commented example showing the expected fields.

The minimum recommended fields are:

- `id`
- `title`
- `description`
- `url`
- `domain`

Optional taxonomy fields support the search/filter interface:

- `resourceType`
- `planningTopic`
- `aiMethod`
- `audience`
- `contributor`
- `institution`
- `date`
- `geography`
- `license`
- `reviewStatus`

## Deploy to GitHub Pages

1. Create a new GitHub repository.
2. Upload **the contents of this folder** to the repository root.
3. Commit the files.
4. In GitHub, open **Settings → Pages**.
5. Under **Build and deployment**, choose:
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/ (root)`
6. Save.
7. GitHub will provide the public Pages URL after deployment completes.

All internal paths are relative, so the site works whether the repository is published at a custom domain or under a GitHub Pages project subpath.


## Self-contained single-file version

The package also includes:

`AI-in-Planning-Repository-Self-Contained.html`

This file contains the **HTML, CSS, JavaScript, and resource data store in one file**. It does not depend on `assets/`, `data/`, or any external library.

To add resources to the single-file version, search near the bottom of the HTML for:

```js
const RESOURCES = [
  // Intentionally empty for the framework stage.
];
```

Add approved resource objects directly inside that array. The Explore filters and the Education / Research / Practice lists will update automatically.

You can open this file directly in a browser for review, or upload it to GitHub Pages as a standalone page.

## Contribution form

The contribution form is a **front-end prototype only**.

GitHub Pages is static hosting, so the form:
- validates required fields in the browser,
- demonstrates the intended metadata fields,
- does **not** save, email, upload, or submit information.

A later ACSP-integrated version can connect this form to an approved backend, member-authentication system, form service, or content-management workflow.

## Current resource state

The repository intentionally contains **no real Education, Research, or Practice resource records yet**. Empty states are shown until curated records are added.

## Suggested next development stages

1. Add the first curated resource records.
2. Validate taxonomy terms against actual resources.
3. Decide the submission backend / ACSP member-login integration.
4. Define review roles and approval status handling.
5. Add official branding assets once approved.
6. Conduct accessibility, mobile, link, search, and usability testing.
