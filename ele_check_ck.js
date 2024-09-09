/**
 * cron 22 09 * * *
*/

const $ = new Env('饿了么-checkck');
const {
    getEnvsByName,
    DisableCk,
    EnableCk,
    updateEnv,
    updateEnv11,
    getEnvByUserId
} = require("./ql");

const {
    wait,
    checkCk,
    validateCarmeWithType,
    invalidCookieNotify,
    getUserInfo,
    runOne,
    getCookieMap
} = require("./common.js");

const _0x11f78e = require("moment");

function _0x543ec4(_0x3fdeea, _0x4dabab) {
    return Math.floor(Math.random() * (_0x4dabab - _0x3fdeea + 1) + _0x3fdeea);
}

function _0x389941(_0x1daaab) {
    let _0x59299c = "";

    for (let [_0x7cf76, _0x5050e8] of _0x1daaab) {
        _0x59299c += _0x7cf76 + "=" + _0x5050e8 + ";";
    }

    return _0x59299c;
}

async function _0x179175(data, context, options) {
    let responseData = await runOne(context, options);

    if (responseData) {
        if (responseData.code === 3000) {
            let parsedData = JSON.parse(responseData.returnValue.data);
            const cookies = parsedData.cookies;
            let cookie2 = null;
            let unb = null;
            for (const cookie of cookies) {
                const cookie2Match = cookie.match(/cookie2=([^;]+)/);
                if (cookie2Match) {
                    cookie2 = cookie2Match[1];
                }
                const unbMatch = cookie.match(/unb=([^;]+)/);
                if (unbMatch) {
                    unb = unbMatch[1];
                }
                if (cookie2 && unb) {
                    break;
                }
            }

            const expiryTimestamp = parsedData.expires;
            const expiryDate = _0x11f78e(expiryTimestamp * 1000).format("YYYY-MM-DD HH:mm:ss");

            let cookieMap = getCookieMap(context);
            let extraMap = JSON.parse(responseData.returnValue.extMap.eleExt);

            for (let item of extraMap) {
                if (item.name === "SID") {
                    break;
                }
            }

            let updatedContext = await runOne(context, cookieMap.get("SID"));

            if (!updatedContext) {
                return;
            }

            cookieMap.set('cookie2', cookie2);

            let updatedEnvironment = _0x389941(cookieMap);

            if (data.id) {
                await updateEnv11(updatedEnvironment, data.id, data.remarks);
            } else {
                await updateEnv(updatedEnvironment, data._id, data.remarks);
            }

            let userID = cookieMap.get("USERID");
            let userEnvironment = await getEnvByUserId(userID);

            

            let successMessage = "刷新成功: " + expiryDate;

            console.log(successMessage);
            return successMessage;
        } else {
            if (responseData.message) {
                console.log(responseData.message);
            } else {
                console.log(response.ret[0]);
            }

            return null;
        }
    }
}



(async function _0x1f3fe2() {
    const aleo = process.env.ELE_CARME;
    await validateCarmeWithType(aleo, 1);
    const pragati = await getEnvsByName("elmck");
    for (let mackala = 0; mackala < pragati.length; mackala++) {
        let athel = pragati[mackala].value;
        if (!athel) {
            console.log(" ❌无效用户信息, 请重新获取ck");
        } else {
            try {
                var houda = 0;
                if (pragati[mackala]._id) {
                    houda = pragati[mackala]._id;
                }
                if (pragati[mackala].id) {
                    houda = pragati[mackala].id;
                }
                athel = athel.replace(/\s/g, "");
                let lavante = await checkCk(athel, mackala);
                if (!lavante) {
                    let deshaune = await _0x179175(pragati[mackala], athel);
                    if (deshaune && deshaune.indexOf("刷新成功") !== -1) {
                        await EnableCk(houda);
                        console.log("第", mackala + 1, "账号正常😁\n");
                    } else {
                        const lakeyah = await DisableCk(houda);
                        if (lakeyah.code === 200) {
                            console.log("第", mackala + 1, "账号失效！已🈲用");
                        } else {
                            console.log("第", mackala + 1, "账号失效！请重新登录！！！😭");
                        }
                        await invalidCookieNotify(athel, pragati[mackala].remarks);
                    }
                } else {
                    let amirr = await getUserInfo(athel);
                    if (!amirr.encryptMobile) {
                        let rudolphe = await _0x179175(pragati[mackala], athel);
                        if (rudolphe && rudolphe.indexOf("刷新成功") !== -1) {
                            await EnableCk(houda);
                            console.log("第", mackala + 1, "账号正常😁\n");
                        } else {
                            const jericca = await DisableCk(houda);
                            if (jericca.code === 200) {
                                console.log("第", mackala + 1, "账号失效！已🈲用");
                            } else {
                                console.log("第", mackala + 1, "账号失效！请重新登录！！！😭");
                            }
                        }
                        await invalidCookieNotify(athel, pragati[mackala].remarks);
                    } else {
                        await _0x179175(pragati[mackala], athel, getCookieMap(athel).get("SID"));
                        await EnableCk(houda);
                        console.log("第", mackala + 1, "账号正常🎉🎉\n");
                    }
                }
            } catch (hannelore) {
                console.log(hannelore);
            }
        }
      await wait(_0x543ec4(1, 3));
    }
    process.exit(0);
}());

function Env(t, e) {
    "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0);
  
    class s {
      constructor(t) {
        this.env = t;
      }
  
      send(t, e = "GET") {
        t = "string" == typeof t ? {
          url: t
        } : t;
        let s = this.get;
        "POST" === e && (s = this.post);
        return new Promise((e, i) => {
          s.call(this, t, (t, s, r) => {
            t ? i(t) : e(s);
          });
        });
      }
  
      get(t) {
        return this.send.call(this.env, t);
      }
  
      post(t) {
        return this.send.call(this.env, t, "POST");
      }
  
    }
  
    return new class {
      constructor(t, e) {
        this.name = t;
        this.http = new s(this);
        this.data = null;
        this.dataFile = "box.dat";
        this.logs = [];
        this.isMute = !1;
        this.isNeedRewrite = !1;
        this.logSeparator = "\n";
        this.startTime = new Date().getTime();
        Object.assign(this, e);
        this.log("", `🔔${this.name}, 开始!`);
      }
  
      isNode() {
        return "undefined" != typeof module && !!module.exports;
      }
  
      isQuanX() {
        return "undefined" != typeof $task;
      }
  
      isSurge() {
        return "undefined" != typeof $httpClient && "undefined" == typeof $loon;
      }
  
      isLoon() {
        return "undefined" != typeof $loon;
      }
  
      toObj(t, e = null) {
        try {
          return JSON.parse(t);
        } catch {
          return e;
        }
      }
  
      toStr(t, e = null) {
        try {
          return JSON.stringify(t);
        } catch {
          return e;
        }
      }
  
      getjson(t, e) {
        let s = e;
        const i = this.getdata(t);
  
        if (i) {
          try {
            s = JSON.parse(this.getdata(t));
          } catch {}
        }
  
        return s;
      }
  
      setjson(t, e) {
        try {
          return this.setdata(JSON.stringify(t), e);
        } catch {
          return !1;
        }
      }
  
      getScript(t) {
        return new Promise(e => {
          this.get({
            url: t
          }, (t, s, i) => e(i));
        });
      }
  
      runScript(t, e) {
        return new Promise(s => {
          let i = this.getdata("@chavy_boxjs_userCfgs.httpapi");
          i = i ? i.replace(/\n/g, "").trim() : i;
          let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");
          r = r ? 1 * r : 20;
          r = e && e.timeout ? e.timeout : r;
          const [o, h] = i.split("@"),
                n = {
            url: `http://${h}/v1/scripting/evaluate`,
            body: {
              script_text: t,
              mock_type: "cron",
              timeout: r
            },
            headers: {
              "X-Key": o,
              Accept: "*/*"
            }
          };
          this.post(n, (t, e, i) => s(i));
        }).catch(t => this.logErr(t));
      }
  
      loaddata() {
        if (!this.isNode()) {
          return {};
        }
  
        {
          this.fs = this.fs ? this.fs : require("fs");
          this.path = this.path ? this.path : require("path");
          const t = this.path.resolve(this.dataFile),
                e = this.path.resolve(process.cwd(), this.dataFile),
                s = this.fs.existsSync(t),
                i = !s && this.fs.existsSync(e);
  
          if (!s && !i) {
            return {};
          }
  
          {
            const i = s ? t : e;
  
            try {
              return JSON.parse(this.fs.readFileSync(i));
            } catch (t) {
              return {};
            }
          }
        }
      }
  
      writedata() {
        if (this.isNode()) {
          this.fs = this.fs ? this.fs : require("fs");
          this.path = this.path ? this.path : require("path");
          const t = this.path.resolve(this.dataFile),
                e = this.path.resolve(process.cwd(), this.dataFile),
                s = this.fs.existsSync(t),
                i = !s && this.fs.existsSync(e),
                r = JSON.stringify(this.data);
          s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r);
        }
      }
  
      lodash_get(t, e, s) {
        const i = e.replace(/\[(\d+)\]/g, ".$1").split(".");
        let r = t;
  
        for (const t of i) if (r = Object(r)[t], void 0 === r) {
          return s;
        }
  
        return r;
      }
  
      lodash_set(t, e, s) {
        return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t);
      }
  
      getdata(t) {
        let e = this.getval(t);
  
        if (/^@/.test(t)) {
          const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t),
                r = s ? this.getval(s) : "";
  
          if (r) {
            try {
              const t = JSON.parse(r);
              e = t ? this.lodash_get(t, i, "") : e;
            } catch (t) {
              e = "";
            }
          }
        }
  
        return e;
      }
  
      setdata(t, e) {
        let s = !1;
  
        if (/^@/.test(e)) {
          const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e),
                o = this.getval(i),
                h = i ? "null" === o ? null : o || "{}" : "{}";
  
          try {
            const e = JSON.parse(h);
            this.lodash_set(e, r, t);
            s = this.setval(JSON.stringify(e), i);
          } catch (e) {
            const o = {};
            this.lodash_set(o, r, t);
            s = this.setval(JSON.stringify(o), i);
          }
        } else {
          s = this.setval(t, e);
        }
  
        return s;
      }
  
      getval(t) {
        return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null;
      }
  
      setval(t, e) {
        return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null;
      }
  
      initGotEnv(t) {
        this.got = this.got ? this.got : require("got");
        this.cktough = this.cktough ? this.cktough : require("tough-cookie");
        this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar();
        t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar));
      }
  
      get(t, e = () => {}) {
        t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]);
        this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
          "X-Surge-Skip-Scripting": !1
        })), $httpClient.get(t, (t, s, i) => {
          !t && s && (s.body = i, s.statusCode = s.status);
          e(t, s, i);
        })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
          hints: !1
        })), $task.fetch(t).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => {
          try {
            if (t.headers["set-cookie"]) {
              const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();
              s && this.ckjar.setCookieSync(s, null);
              e.cookieJar = this.ckjar;
            }
          } catch (t) {
            this.logErr(t);
          }
        }).then(t => {
          const {
            statusCode: s,
            statusCode: i,
            headers: r,
            body: o
          } = t;
          e(null, {
            status: s,
            statusCode: i,
            headers: r,
            body: o
          }, o);
        }, t => {
          const {
            message: s,
            response: i
          } = t;
          e(s, i, i && i.body);
        }));
      }
  
      post(t, e = () => {}) {
        if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) {
          this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, {
            "X-Surge-Skip-Scripting": !1
          }));
          $httpClient.post(t, (t, s, i) => {
            !t && s && (s.body = i, s.statusCode = s.status);
            e(t, s, i);
          });
        } else {
          if (this.isQuanX()) {
            t.method = "POST";
            this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, {
              hints: !1
            }));
            $task.fetch(t).then(t => {
              const {
                statusCode: s,
                statusCode: i,
                headers: r,
                body: o
              } = t;
              e(null, {
                status: s,
                statusCode: i,
                headers: r,
                body: o
              }, o);
            }, t => e(t));
          } else {
            if (this.isNode()) {
              this.initGotEnv(t);
              const {
                url: s,
                ...i
              } = t;
              this.got.post(s, i).then(t => {
                const {
                  statusCode: s,
                  statusCode: i,
                  headers: r,
                  body: o
                } = t;
                e(null, {
                  status: s,
                  statusCode: i,
                  headers: r,
                  body: o
                }, o);
              }, t => {
                const {
                  message: s,
                  response: i
                } = t;
                e(s, i, i && i.body);
              });
            }
          }
        }
      }
  
      time(t, e = null) {
        const s = e ? new Date(e) : new Date();
        let i = {
          "M+": s.getMonth() + 1,
          "d+": s.getDate(),
          "H+": s.getHours(),
          "m+": s.getMinutes(),
          "s+": s.getSeconds(),
          "q+": Math.floor((s.getMonth() + 3) / 3),
          S: s.getMilliseconds()
        };
        /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length)));
  
        for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length)));
  
        return t;
      }
  
      msg(e = t, s = "", i = "", r) {
        const o = t => {
          if (!t) {
            return t;
          }
  
          if ("string" == typeof t) {
            return this.isLoon() ? t : this.isQuanX() ? {
              "open-url": t
            } : this.isSurge() ? {
              url: t
            } : void 0;
          }
  
          if ("object" == typeof t) {
            if (this.isLoon()) {
              let e = t.openUrl || t.url || t["open-url"],
                  s = t.mediaUrl || t["media-url"];
              return {
                openUrl: e,
                mediaUrl: s
              };
            }
  
            if (this.isQuanX()) {
              let e = t["open-url"] || t.url || t.openUrl,
                  s = t["media-url"] || t.mediaUrl;
              return {
                "open-url": e,
                "media-url": s
              };
            }
  
            if (this.isSurge()) {
              let e = t.url || t.openUrl || t["open-url"];
              return {
                url: e
              };
            }
          }
        };
  
        if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) {
          let t = ["", "==============📣系统通知📣=============="];
          t.push(e);
          s && t.push(s);
          i && t.push(i);
          console.log(t.join("\n"));
          this.logs = this.logs.concat(t);
        }
      }
  
      log(...t) {
        t.length > 0 && (this.logs = [...this.logs, ...t]);
        console.log(t.join(this.logSeparator));
      }
  
      logErr(t, e) {
        const s = !this.isSurge() && !this.isQuanX() && !this.isLoon();
        s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t);
      }
  
      wait(t) {
        return new Promise(e => setTimeout(e, t));
      }
  
      done(t = {}) {
        const e = new Date().getTime(),
              s = (e - this.startTime) / 1000;
        this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`);
        this.log();
        (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t);
      }
  
    }(t, e);
  }