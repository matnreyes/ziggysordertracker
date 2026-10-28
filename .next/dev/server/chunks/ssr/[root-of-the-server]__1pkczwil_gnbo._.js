module.exports = [
"[externals]/next/dist/server/app-render/module-loading/track-module-loading.external.js [external] (next/dist/server/app-render/module-loading/track-module-loading.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/module-loading/track-module-loading.external.js", () => require("next/dist/server/app-render/module-loading/track-module-loading.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/app/middleware/codeGenerator.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {

const crypto = __turbopack_context__.r("[externals]/crypto [external] (crypto, cjs)");
const base64URLEncode = (str)=>str.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
const sha256 = (buffer)=>crypto.createHash("sha256").update(buffer).digest();
module.exports = ()=>{
    const codeVerifier = base64URLEncode(crypto.randomBytes(32));
    const codeChallenge = base64URLEncode(sha256(codeVerifier));
    const state = base64URLEncode(crypto.randomBytes(16));
    return {
        state,
        codeVerifier,
        codeChallenge
    };
};
}),
"[project]/app/page.tsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$middleware$2f$codeGenerator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/app/middleware/codeGenerator.js [app-rsc] (ecmascript)");
;
;
function Home() {
    const { state, codeChallenge, codeVerifier } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$app$2f$middleware$2f$codeGenerator$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"])();
    const params = new URLSearchParams({
        response_type: 'code',
        redirect_uri: process.env.REDIRECT_URI,
        scope: 'email_r listings_r transactions_r',
        client_id: process.env.ETSY_API_KEY,
        state,
        code_challenge: codeChallenge,
        code_challenge_method: 'S256'
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
        href: `https://www.etsy.com/oauth/connect?${params}`,
        children: "Authenticate with Etsy"
    }, void 0, false, {
        fileName: "[project]/app/page.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
}),
"[project]/app/page.tsx [app-rsc] (ecmascript, Next.js Server Component)", (function(__turbopack_context__){

__turbopack_context__.n(__turbopack_context__.i("[project]/app/page.tsx [app-rsc] (ecmascript)"));
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1pkczwil_gnbo._.js.map