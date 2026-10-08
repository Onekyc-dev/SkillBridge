SkillBridge - file layout

package.json
app/layout.js
app/providers.js
app/globals.css
app/page.js
app/api/auth/[...nextauth]/route.js     <- bracket folder, may need manual upload
app/courses/[slug]/page.js              <- bracket folder, may need manual upload
components/AuthButton.js
components/AdGate.js
components/CourseView.js
lib/courses.js

package.json must sit at the top level of the GitHub repo, not inside another folder.
