[33md6dcd13[m[33m ([m[1;36mHEAD[m[33m -> [m[1;32mmain[m[33m, [m[1;31morigin/main[m[33m)[m SECURITY: Upgrade to Next.js 15.5.7 - All vulnerabilities patched (0 vulnerabilities)
 package-lock.json | 449 [32m+++++++++++++++++++++++++++++[m[31m-------------------------[m
 package.json      |  17 [32m+[m[31m--[m
 2 files changed, 253 insertions(+), 213 deletions(-)
[33md93bfe6[m URGENT: Fix CVE-2025-55182 - Upgrade Next.js from 14.2.3 to 15.1.9 (patched)
 package-lock.json | 1344 [32m+++++++++++++++++++++++++++++[m[31m------------------------[m
 package.json      |    4 [32m+[m[31m-[m
 2 files changed, 746 insertions(+), 602 deletions(-)
[33mc796fee[m Fix Next.js dynamic server error - Add force-dynamic to QuickBooks API routes
 app/api/quickbooks/accounts/route.js                        | 2 [32m++[m
 app/api/quickbooks/callback/route.js                        | 2 [32m++[m
 app/api/quickbooks/connect/route.js                         | 2 [32m++[m
 app/api/quickbooks/mapping/route.js                         | 2 [32m++[m
 app/api/quickbooks/settlements/[settlementId]/sync/route.js | 2 [32m++[m
 5 files changed, 10 insertions(+)
[33m1cc0c07[m Restore QuickBooks integration and auth system
 QUICKBOOKS_IMPLEMENTATION_SUMMARY.md               | 316 [32m++++++++++++++++++[m
 QUICKBOOKS_SETUP_GUIDE.md                          | 321 [32m++++++++++++++++++[m
 app/api/auth/login/route.js                        |  40 [32m+++[m
 app/api/auth/logout/route.js                       |  20 [32m++[m
 app/api/auth/signup/route.js                       |  40 [32m+++[m
 app/api/demo/data/route.js                         |  81 [32m+++++[m
 app/api/quickbooks/accounts/route.js               |  57 [32m++++[m
 app/api/quickbooks/callback/route.js               | 111 [32m+++++++[m
 app/api/quickbooks/connect/route.js                |  51 [32m+++[m
 app/api/quickbooks/mapping/route.js                | 147 [32m+++++++++[m
 .../settlements/[settlementId]/sync/route.js       | 217 [32m+++++++++++++[m
 app/api/settlements/route.js                       |  37 [32m+++[m
 app/login/page.jsx                                 | 107 [32m++++++[m
 app/settings/quickbooks/page.jsx                   | 361 [32m+++++++++++++++++++++[m
 app/settlements/page.jsx                           | 248 [32m++++++++++++++[m
 app/signup/page.jsx                                | 125 [32m+++++++[m
 database/quickbooks-schema.sql                     |  97 [32m++++++[m
 lib/auth.js                                        | 136 [32m++++++++[m
 lib/quickbooks-api.js                              | 257 [32m+++++++++++++++[m
 types/quickbooks.ts                                | 103 [32m++++++[m
 20 files changed, 2872 insertions(+)
[33m85a9670[m Improve dashboard UX - Add clear step-by-step instructions and status indicators
 ENV_EXAMPLE.txt                                    |  15 [31m-[m
 QUICKBOOKS_IMPLEMENTATION_SUMMARY.md               | 316 [31m------------------[m
 QUICKBOOKS_SETUP_GUIDE.md                          | 321 [31m------------------[m
 app/api/auth/login/route.js                        |  40 [31m---[m
 app/api/auth/logout/route.js                       |  20 [31m--[m
 app/api/auth/signup/route.js                       |  40 [31m---[m
 app/api/demo/data/route.js                         |  81 [31m-----[m
 app/api/quickbooks/accounts/route.js               |  57 [31m----[m
 app/api/quickbooks/callback/route.js               | 111 [31m-------[m
 app/api/quickbooks/connect/route.js                |  51 [31m---[m
 app/api/quickbooks/mapping/route.js                | 147 [31m---------[m
 .../settlements/[settlementId]/sync/route.js       | 217 [31m-------------[m
 app/api/settlements/route.js                       |  37 [31m---[m
 app/api/sync/route.js                              |  19 [31m--[m
 app/dashboard/page.jsx                             | 251 [32m+++++++[m[31m-------[m
 app/layout.jsx                                     |   6 [32m+[m[31m-[m
 app/login/page.jsx                                 | 107 [31m------[m
 app/page.jsx                                       | 269 [32m+++++[m[31m----------[m
 app/settings/quickbooks/page.jsx                   | 361 [31m---------------------[m
 app/settlements/page.jsx                           | 248 [31m--------------[m
 app/signup/page.jsx                                | 131 [31m--------[m
 components/FeeBreakdown.jsx                        |  26 [32m+[m[31m-[m
 components/ProfitCards.jsx                         |  25 [32m+[m[31m-[m
 database/quickbooks-schema.sql                     |  97 [31m------[m
 lib/auth.js                                        | 136 [31m--------[m
 lib/quickbooks-api.js                              | 257 [31m---------------[m
 lib/supabase.js                                    |  47 [31m---[m
 types/quickbooks.ts                                | 103 [31m------[m
 28 files changed, 262 insertions(+), 3274 deletions(-)
