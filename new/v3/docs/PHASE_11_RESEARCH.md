# Phase 11 Research: Content Completion System

**Phase Goal:** Replace placeholders and shallow summaries with polished, source-backed content.

---

## Research Question 1: What content is missing from each page?

### Homepage
- ✅ **Hero identity**: Defined and first-person ("I build systems...")
- ✅ **Proof points**: All three have metrics and sources
- ✅ **Featured systems**: Spendora, News Headline Classification, Media Recommender listed in content-intake.json
- ⚠️ **Experience preview**: Names mentioned (Siemens, deployments, Terraform) but no URLs or companies links
- ⚠️ **Travel & Life preview**: Only placeholders (Seattle, LA, San Diego) with TBD locations

### Projects Page
- ✅ **Spendora**: Full architecture, technical decisions, tradeoffs documented
  - ❌ Missing: GitHub link, live demo, actual metrics (TBD on conversational accuracy & time savings)
  - ❌ Missing: Screenshots/visuals for conversation flows and dashboards
- ✅ **News Headline Classification**: Complete technical depth
  - ❌ Missing: GitHub link, live demo
  - ❌ Missing: Model architecture diagram, confusion matrix, training curves
- ✅ **Media Recommendation System**: Multiple algorithms documented
  - ✅ Paper: IJRASET42927 (link provided)
  - ❌ Missing: GitHub link, live demo
  - ❌ Missing: Recommendation interface screenshots, algorithm comparison charts
- ✅ **SoundScape**: Architecture and caching optimization documented
  - ❌ Missing: GitHub link, live demo
  - ❌ Missing: Player interface screenshots, search/browse screens

### Thinking Page
- ❌ **All posts are drafts/active**: No published content yet
  - "Evaluating Technical Projects" (draft) - outline exists, needs full essay
  - "Systematic Job Search" (active) - outline exists, needs full essay + examples
  - "Judging Student Projects" (draft) - outline exists, needs full essay
- ⚠️ No thinking posts have publish dates set
- ⚠️ Examples and stories are mentioned but not written out

### Experience Page
- ✅ **Siemens roles**: Both have 2 entries (SDE + Intern) with summaries and impacts
- ✅ **Government internship**: Maharashtra role with summary and impacts
- ✅ **Education**: Listed in planning but not in content-intake.json yet
- ⚠️ Missing: Exact dates (months/years only, no specific start/end days mentioned)
- ⚠️ Missing: Links to company websites or detail pages

### Contact Page
- ✅ **Email**: Defined (tanmay.v.bhuskute@gmail.com)
- ✅ **LinkedIn**: Defined (linkedin.com/in/tanmay-bhuskute)
- ✅ **GitHub**: Defined (github.com/Tanmayb05)
- ✅ **Open to roles**: 6 roles listed (Backend, Software, DevOps, Data, ML, Data Scientist)
- ✅ **Short note**: First/active voice, job search focus for Summer/Fall 2026

### Travel & Life Page
- ❌ **All entries are placeholders**: Seattle, LA, San Diego
  - timeVisited: TBD
  - locationsVisited: all TBD
  - googleMapsLinks: all TBD
  - photos: all TBD
  - descriptions: incomplete ("...and experienced TBD")

---

## Research Question 2: Which facts can come from resume, project repos, papers, screenshots, or notes?

### Available External Sources

#### Resume Data
- ✅ All experience dates and titles: Siemens (Jul 2022-Jun 2024), Siemens Intern (Mar 2022-Jun 2022), Maharashtra (Sep 2021-Dec 2021)
- ✅ All impact metrics: 44 production upgrades, 50% downtime reduction, 40% deployment improvement, 200% code coverage increase
- ✅ Project summaries: Headlines (93.28% accuracy, 400K+ dataset), Media Rec (IJRASET42927), SoundScape (70% API reduction)
- ✅ Education: MS CS at University of Cincinnati (Aug 2024-May 2026), BE at AISSMS (Aug 2018-Jul 2022)

#### Project Repositories
- ❌ **None currently linked** (all GitHub links are TBD in content-intake.json)
- ❓ Can you access repos for:
  - Spendora (LangChain, HuggingFace, Mistral, Gemma)
  - News Headline Classification (LSTM, PyTorch, spaCy)
  - Media Recommendation (React, Flask, Spotify API)
  - SoundScape (Android, Java, Musixmatch API)
- 📋 If repos exist, they could provide:
  - Real commit history / implementation timeline
  - Architecture diagrams or design documents
  - README files with project motivation/results
  - Code snippets showing key technical decisions

#### Project Demos / Live URLs
- ❌ **All demos are TBD** (no live URLs for any project)
- 🤔 Which projects are actually deployed/available?
  - Spendora: Is there a live web app or API?
  - SoundScape: Is there an APK or app store link?
  - Others: Any hosted versions?

#### Papers / Publications
- ✅ **Media Recommendation System**: Published in IJRASET (Paper ID: IJRASET42927)
  - Paper link: https://ijraset.com/ (needs Paper ID appended)
  - Could extract: methodology, results, validation approach, citations

#### Screenshots / Visuals
- 🤔 **Listed as needed but not yet collected**:
  - Spendora: Conversation flow, dashboard screenshots
  - News Headline: Model architecture, confusion matrix, training curves
  - Media Rec: Recommendation interface, algorithm comparison
  - SoundScape: Player UI, search screens, playlists
- 📝 Do you have screenshots from development or final product?
- 📝 Can you generate diagrams (architecture, data flow, algorithm comparisons)?

#### Notes / Documentation
- 🤔 **Do you have personal notes on**:
  - Technical decisions and why certain choices were made?
  - Constraints faced and how you worked around them?
  - Real metrics from development (training time, API response times, user feedback)?
  - Lessons learned or what you'd do differently?

---

## Research Question 3: Which items should stay private or unpublished?

### Current Assessment (Based on content-intake.json)

#### OK to Publish (No Privacy Risk)
- ✅ All project names and summaries (Spendora, News Headline, Media Rec, SoundScape)
- ✅ All technical stack information (tech choices are professional, not sensitive)
- ✅ All experience roles and companies (Siemens, Government of Maharashtra, UC, AISSMS)
- ✅ All metrics and results (demonstrating your work, not revealing secrets)
- ✅ Contact info (email, LinkedIn, GitHub are all public-facing)
- ✅ Job search targets (Backend, DevOps, ML, etc. — standard roles)

#### Conditional Publishing (Consider Context)
- ⚠️ **Siemens-specific details**: 
  - Is publishing "44 production upgrades in 4 months" OK, or could this reveal internal velocity?
  - Are "Blue-Green deployments" and "Terraform automation" general enough knowledge, or company-specific strategies?
  - **Recommendation**: Check with your manager/Siemens NDA before publishing production metrics
  
- ⚠️ **Government project details**:
  - "Digitized record management" for Maharashtra department
  - Could this reveal process/system vulnerabilities?
  - **Recommendation**: Keep vague (digitized records) unless you have explicit permission

- ⚠️ **Job search strategy**:
  - Publishing "How I'm Running My Job Search Like a System" in detail
  - Could reveal your targets, frequency, follow-ups to competitors/other candidates
  - **Recommendation**: Keep general (yes, use a system) but don't publish exact cadence or targets

#### Don't Publish (Private)
- ❌ **Exact salary figures** (not in content-intake.json, good)
- ❌ **Personal relationships or referral sources** (not in content-intake.json, good)
- ❌ **Internal code or intellectual property** (not in content-intake.json, good)
- ❌ **Student project details from judging** (if you plan to judge at CEAS Expo, anonymize examples)

### Recommendation for Phase 11 Scope
**Publish everything in content-intake.json as-is.** It's already vetted for privacy. Just verify:
1. Siemens metrics are releasable (check NDA)
2. Government project summary doesn't expose vulnerabilities
3. Job search essay stays strategic (don't publish exact numbers)

---

## Research Question 4: What is the minimum content needed for each page to feel complete?

### Homepage
**Minimum Content for Completeness:**
- ✅ **Hero**: Identity statement + what you build + what you care about
  - Current state: All present in content-intake.json
  - Status: Ready to publish
  
- ✅ **Proof Points**: 3 concrete results with context
  - Current: 44 upgrades (Siemens), 50% downtime reduction, 93.28% accuracy (Headlines)
  - Status: Ready to publish

- ⚠️ **Featured Systems Preview**: Links to 3 projects with 1-line summaries
  - Current: Spendora, Headlines, Media Rec are listed
  - Needs: Links to `/projects/[slug]` pages

- ⚠️ **Experience Preview**: 2-3 bullet points about your work
  - Current: Mentioned in planning ("Siemens production upgrades, Blue-Green, Terraform")
  - Needs: Extract from content-intake.json experience section

- ⚠️ **Living Systems / Currently**: 3-4 items you're actively working on
  - Current: System Design, Leetcode, job search, behavioral prep (in content-intake.json)
  - Status: Ready, needs formatting as cards/list

- ✅ **CTA**: Single clear call-to-action (contact, projects, etc.)
  - Current: Soft CTAs in planning ("See my work", "Get in touch")
  - Status: Ready

**Verdict:** Homepage can be published once project pages exist. Currently ~80% complete (only needs project/experience links).

---

### Projects Page (Index)
**Minimum Content for Completeness:**

#### Project Cards Need:
1. **Spendora**
   - ✅ Title, summary (LLM-powered AI for expense insights)
   - ✅ Tech stack preview (LangChain, HuggingFace)
   - ✅ One key metric (conversational AI with RAG)
   - ❌ Needs: GitHub/demo link OR prominent "Link TBD" disclaimer
   - ❌ Needs: Thumbnail/visual

2. **News Headline Classification**
   - ✅ Title, summary (LSTM, 93.28% accuracy, 400K headlines)
   - ✅ Tech stack (PyTorch, spaCy, Python)
   - ✅ Concrete result (93.28%)
   - ❌ Needs: GitHub/demo link OR disclaimer
   - ❌ Needs: Thumbnail

3. **Media Recommendation System**
   - ✅ Title, summary (multiple algorithms)
   - ✅ Tech stack (React, Flask, Spotify API)
   - ✅ Published metric (IJRASET42927)
   - ❌ Needs: GitHub link OR disclaimer
   - ❌ Needs: Paper link (https://ijraset.com/IJRASET42927)
   - ❌ Needs: Thumbnail

4. **SoundScape**
   - ✅ Title, summary (Android music streaming, 70% API reduction)
   - ✅ Tech stack (Android SDK, Java, Room DB)
   - ✅ Key metric (70% API call reduction)
   - ❌ Needs: GitHub/APK link OR disclaimer
   - ❌ Needs: Thumbnail

**Verdict:** Index page is ~70% complete. Needs:
- Link structure (show TBD vs. actual links)
- Thumbnail/visual for each project
- Then route to detail pages

---

### Project Detail Pages (Case Studies)
**Minimum Content Per Project for Completeness:**

Each project page needs:
1. **Problem** (what problem, who it's for, why it mattered)
   - ✅ All present in content-intake.json
   
2. **Context** (when built, type, constraints)
   - ✅ All present

3. **Architecture** (input → backend → storage → APIs → output)
   - ✅ All present

4. **Technical Decisions** (what, why, alternative)
   - ✅ All present (2-3 per project)

5. **Tradeoffs** (what trade-offs did you accept?)
   - ✅ All present

6. **Metrics & Results** (exact numbers only)
   - ⚠️ **Spendora**: Metrics are TBD (conversational accuracy, time savings)
     - Action: Either measure/define or remove metrics section
   - ✅ **Headlines**: 93.28%, 25% efficiency — sourced
   - ✅ **Media Rec**: Published (IJRASET), multiple algorithms
   - ✅ **SoundScape**: 70% API reduction — sourced

7. **Tech Stack** (list of technologies)
   - ✅ All present

8. **Links** (GitHub, demo, paper, video)
   - ⚠️ **All are TBD** — at minimum, show status (e.g., "GitHub: Coming soon" vs. link)

9. **Visuals** (diagrams, screenshots, code)
   - ❌ **None collected yet**
   - Needed: At least one visual per project (architecture diagram, screenshot, code snippet)

10. **What I'd Improve Next** (future work)
    - ✅ All present

**Verdict:** Detail pages are ~70% complete. Blocking items:
- Spendora: Define metrics or remove TBD entries
- All projects: Add visuals (diagrams, screenshots, code examples)
- All projects: Show link status (not just TBD)

---

### Thinking Page (Index)
**Minimum Content for Completeness:**

Each thinking entry needs:
- ✅ **Slug, title, category**: All present
- ✅ **Summary**: All present (1-2 sentences)
- ✅ **Main point**: All present (core idea)
- ⚠️ **Status** (planned/draft/active/published):
  - "Evaluating Technical Projects" = draft
  - "Systematic Job Search" = active (ready to expand)
  - "Judging Student Projects" = draft
  - **Action**: Change status to "planned" for draft essays not yet written
- ❌ **Publish date**: All TBD
  - **Action**: Set target dates or mark "TBD pending content"

**For Index Display, Show:**
- Title + category + status (e.g., "[Draft] How I Evaluate Technical Projects")
- One-line summary
- Link to detail (if published) or placeholder if draft

**Verdict:** Index is ~50% complete. Needs:
- Published essays (pick 1-2 to complete first)
- Publish dates (even if TBD)
- Clear draft/published visual distinction

---

### Thinking Detail Pages (Essays)
**Minimum Content for a Published Essay:**

Using "Systematic Job Search" as example (most complete outline):
- ✅ **Intro**: Why you needed a system (avoid random job search)
- ✅ **Point 1**: Daily application targets (structured process)
- ⚠️ **Point 2**: Referral outreach (mentioned, needs detail)
- ⚠️ **Point 3**: Cold email strategy (mentioned, needs examples)
- ⚠️ **Conclusion**: System compounds (assertion needs proof)
- ❌ **Examples/Stories**: Mentioned but not written ("How structured daily applications led to...")

**Missing for Publication:**
- Full essay text (currently just outline)
- Real examples (how many apps/week? which companies? response rates?)
- Data/evidence (don't just claim system works, show results)
- Links to related projects (if applicable)

**Verdict:** Essays are 30-40% complete. Needs:
- Full essay text written from outline
- Real examples and data points
- Publish date once draft is ready

---

### Experience Page
**Minimum Content for Completeness:**

Each role needs:
- ✅ **Company, role, location, dates**: All present (Siemens, SDE, Remote; Siemens, Intern, Remote; Maharashtra, Intern, India)
- ✅ **Summary**: All present (1-2 sentences of what you did)
- ✅ **Key impacts**: All present (3 per role)
- ✅ **Extra details**: All present (mentoring, documentation, etc.)
- ❌ **Company links**: None (URLs to Siemens, UC, AISSMS)
- ❌ **Role descriptions**: All generic (need specific achievements, not just impacts)

**Education Missing:**
- ❌ Not in content-intake.json yet
- Should add: MS CS @ UC (Aug 2024-May 2026) and BE @ AISSMS (Aug 2018-Jul 2022)

**Optional but Nice:**
- Links to company websites or your portfolio work
- Highlights of 1-2 key learnings per role

**Verdict:** Experience page is 70% complete. Needs:
- Education section added
- Company links (if public)
- Optional: 1-2 key learnings per role

---

### Contact Page
**Minimum Content for Completeness:**

- ✅ **Email**: Present (tanmay.v.bhuskute@gmail.com)
- ✅ **LinkedIn**: Present (linkedin.com/in/tanmay-bhuskute)
- ✅ **GitHub**: Present (github.com/Tanmayb05)
- ✅ **Open to roles**: Present (6 roles listed)
- ✅ **Short note**: Present (active job search, Summer/Fall 2026, interests)
- ❌ **Resume download link**: Mentioned in planning but not linked

**Optional:**
- Contact form (if email links feel incomplete)
- Social proof (followers, contributions, etc.)

**Verdict:** Contact page is 85% complete. Just needs:
- Resume download link wired up
- Test all contact links work

---

### Travel & Life Page
**Minimum Content for Completeness:**

**Current State:** All 3 entries are placeholders (Seattle, LA, San Diego with all TBD fields)

**For Each Location, Minimum Content:**
- ✅ **Title, region, city**: Present
- ❌ **Time visited**: TBD (need dates)
- ❌ **Description**: Placeholder ("...and experienced TBD")
- ❌ **Locations visited**: TBD (specific places, landmarks)
- ❌ **Google Maps link**: TBD
- ❌ **Photos**: TBD (at least 1 per location)

**Decision Point:** Should this page launch empty, or wait for real content?
- **Option A:** Show 3 placeholder cards with note "More travel coming soon" → feels incomplete
- **Option B:** Don't show Travel until you have real data → but page exists in nav
- **Option C:** Show only 1-2 locations with real data, others as "planned" → feels more honest

**Recommendation:** Skip Travel & Life from Phase 11 MVP. It's entirely placeholder. Better to show it in Phase 14 when you have real data.

**Verdict:** Travel page is 0% complete. Should be deferred to Phase 14.

---

## Summary Table: Content Completeness by Page

| Page | Status | Blocker | Action |
|------|--------|---------|--------|
| **Homepage** | 80% | Project & experience links need to exist | Wire links to projects page & experience section |
| **Projects Index** | 70% | Links TBD, thumbnails missing | Decide link display (TBD vs. actual), add placeholder thumbnails |
| **Project Details** | 70% | Spendora metrics TBD, all need visuals | Finalize Spendora metrics or remove, add architecture diagrams/screenshots |
| **Thinking Index** | 50% | All essays unwritten, dates TBD | Mark drafts clearly, pick 1-2 to write first |
| **Thinking Details** | 30% | Essays are outlines only | Expand 1-2 essays to full text with real examples |
| **Experience** | 70% | Education section missing, no company links | Add education to content-intake.json, optional: company links |
| **Contact** | 85% | Resume download not wired | Wire `/resume.pdf` download link, test all links |
| **Travel & Life** | 0% | All placeholders (TBD fields) | **DEFER to Phase 14** — no real data yet |

---

## Key Decisions Needed Before Implementation

### Decision 1: How to Handle TBD Links
In Phase 11, should project pages show:
- **Option A:** Live links to GitHub/demos (only publish when links exist)
- **Option B:** "GitHub: Coming soon" placeholders (publish pages, show intent to add links)
- **Option C:** Remove link sections entirely, add later in Phase 12

**Recommendation:** **Option B** — Show link status clearly. Readers understand "Coming soon" better than dead or missing links.

### Decision 2: Spendora Metrics
Should you:
- **Option A:** Measure the metrics (run evaluation, calculate accuracy/time savings)
- **Option B:** Remove metrics section and rely on technical description
- **Option C:** Make metrics more qualitative ("provides faster insights than manual analysis")

**Recommendation:** **Option A** — Run one evaluation (e.g., 5-10 real expense queries, measure accuracy and response time). Adds credibility.

### Decision 3: Which Thinking Essay to Publish First
You have 3 drafts:
- "Evaluating Technical Projects" (academic, framework-focused)
- "Systematic Job Search" (personal, ongoing, most complete outline)
- "Judging Student Projects" (similar to #1, role-specific)

**Recommendation:** Start with **"Systematic Job Search"** (active status, most personal, timely for your job search phase). It's the most complete outline and most relevant to your current work.

### Decision 4: When to Defer Travel & Life
Should you:
- **Option A:** Launch phase 11 without Travel & Life, defer to Phase 14
- **Option B:** Include placeholder Travel & Life in Phase 11, replace with real content in Phase 14
- **Option C:** Build Travel & Life UI in Phase 11 but hide it behind a feature flag

**Recommendation:** **Option A** — Defer entirely. Publishing "TBD" for all fields looks unfinished. Wait for real data.

### Decision 5: Education Dates
The planning mentions education but it's not in content-intake.json. Should you:
- **Option A:** Add education to content-intake.json with full details (GPA, major, relevant coursework)
- **Option B:** Add only dates, titles, institutions
- **Option C:** Move education to a separate section on Experience page

**Recommendation:** **Option A** — Add to content-intake.json (dates, institution, degree, major). Treat it as another experience section.

---

## Next Steps for Phase 11 Implementation

Once you've made the decisions above:

1. **Fix content-intake.json**
   - Add education section
   - Define Spendora metrics (or mark as "qualitative")
   - Add company location links (if public)

2. **Gather project visuals**
   - Create or find: architecture diagrams, screenshots, code examples
   - One visual per project minimum

3. **Finalize project links**
   - Verify GitHub repos exist or decide on "Coming soon" display
   - Verify paper link for Media Rec

4. **Write first thinking essay**
   - Expand "Systematic Job Search" outline to full essay
   - Add real examples and data points
   - Set publish date

5. **Add education to Experience page**
   - Pull from content-intake.json (once added)
   - Keep format consistent with work experience

6. **Resume download**
   - Wire `/resume.pdf` route to download from `/public/resume.pdf`
   - Test on all pages where it appears

7. **Quality checks**
   - Verify all links work
   - Check for third-person voice (should be all first-person)
   - Confirm no invented facts remain
