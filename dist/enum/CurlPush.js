"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurlPush = void 0;
/**
 * Copyright (c) Jonathan Cardoso Machado. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
// https://github.com/curl/curl/blob/eab2f95c0de94e9816c8a6110d20673761dd97a4/include/curl/multi.h#L426-L435
/**
 * Object with constants to be used as the return value for the {@link "Multi".Multi.setOpt | `Multi`} option `PUSHFUNCTION`.
 *
 * `CURL_PUSH_OK` becomes `CurlPush.Ok`
 *
 * @public
 */
var CurlPush;
(function (CurlPush) {
    CurlPush[CurlPush["Ok"] = 0] = "Ok";
    CurlPush[CurlPush["Deny"] = 1] = "Deny";
    /**
     * Added in 7.72.0
     */
    CurlPush[CurlPush["ErrorOut"] = 2] = "ErrorOut";
})(CurlPush || (exports.CurlPush = CurlPush = {}));
//# sourceMappingURL=CurlPush.js.map