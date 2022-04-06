// Api methods:
//     "/getitems":
//         returns an array of all current items
//
//     "/getitem":
//         takes the data `id` that is an int or a string, returns the item with
//         the corresponding id, if there exists one.
//
//     "/putitem"
//         takes the data that is an item, appends it to the list of items,
//         then returns the id of the appended item.
//
//     "/getusers"
//         returns an array of usernames. User at position n has userId n.
//
//     "/getuser"
//         takes the data `userId` that is an int or a string, returns the user
//         with the corresponding userId, if there exists one.
//
// Additional info:
//   General:
//       The XMLHttpRequest class of this document mimics the actual XMLHttpRequest
//       class. There is a built in risk that requests are lost. The methods for
//       onload and onloadend are not implemented, use onreadystatechange instead.
//       However, the method ontimeout is implemented.
//
//   Users:
//       The users are the entries of the Swedish spelling alphabet
//       (https://en.wikipedia.org/wiki/Spelling_alphabet#Latin_alphabets); hence
//       there are 29 different users. Each user has an id; each id is unique and
//       is in the range [0, 28]. The ids of the users are randomised; hence user
//       with username "Adam" does not have to be the user with index 0. Users
//       cannot be added. An item is considered to be owned by an user u if the
//       items userId property corresponds to the id of u.
//
//   Items:
//       Items are by using the /putitem-call with the method "PUT". When sending
//       an item i to /putitem, then the item will be updated if i has an the
//       property id, and there already exists an item with the same id as the id
//       of i, else the item is added to the api. If the /putitem call succeeds,
//       then the id of the added or updated item will be returned.
//
// example 1:
//      var x = api.XMLHttpRequest();
//      x.onreadystatechange = function() {
//          console.log(x.readyState, x.status, x.responseText);
//      };
//      x.open("GET", "/getusers");
//      x.send();
// example 2:
//     var y = api.XMLHttpRequest();
//     y.onreadystatechange = function() {
//         console.log(y.readyState, y.status, y.responseText);
//     };
//     y.open("GET", "/getuser");
//     y.send('"0"');

const api = (function () {
    function t(t) {
        for (var e = t.length - 1; e > 0; e--) {
          var n = Math.floor(Math.random() * (e + 1)),
            r = t[e];
            (t[e] = t[n]);
            (t[n] = r);
        }
        return t;
    }
  for (
    var e = 100,
      n = 1600,
      r = 0.2,
      o = function (t, e) {
        return Math.floor(Math.random() * (e - t + 1) + t);
      },
      a = 0,
      i = function (t, e) {
        for (var n = 0, r = 0; 10 > r; r += 1) n += Math.random();
        return t + (n / 10) * (e - t + 1);
      },
      s = ["ad","adipiscing","aliqua","aliquip","amet","anim","aute","cillum","commodo","consectetur","consequat","culpa","cupidatat","deserunt","do","dolor","dolore","duis","ea","eiusmod","elit","enim","esse","est","et","eu","ex","excepteur","exercitation","fugiat","id","in","incididunt","ipsum","irure","labore","laboris","laborum","lorem","magna","minim","mollit","nisi","non","nostrud","nulla","occaecat","officia","pariatur","proident","qui","quis","reprehenderit","sed","sint","sit","sunt","tempor","ullamco","ut","ut","velit","veniam","voluptate",
      ],
      u = t(["Adam","Bertil","Cesar","David","Erik","Filip","Gustav","Helge","Ivar","Johan","Kalle","Ludvig","Martin","Niklas","Olof","Petter","Qvintus","Rudolf","Sigurd","Tore","Urban","Viktor","Wilhelm","Xerxes","Yngve","Zäta","Åke","Ärlig","Östen",
      ]),
      l = function () {
        t(s);
        for (var e = "", n = 0, r = i(1, s.length - 1); r > n; n++)
          e = e + " " + s[n];
        return {
          date: new Date(
            i(new Date().getTime() - 2592e3, new Date().getTime() + 2592e3)
          ),
          text: e.trim(),
          id: a++,
          active: Math.random() < 0.5,
          userId: o(0, u.length - 1),
        };
      },
      f = {},
      p = 0,
      c = i(10, 50);
    c > p;
    p++
  ) {
    var m = l();
    f[m.id] = m;
  }
  var d = function (t, e, n, r, o, a, i) {
      if (
        "string" == typeof t &&
        "string" == typeof e &&
        e.length > 0 &&
        "/" === e.charAt(0) &&
        "string" == typeof o &&
        "object" == typeof a &&
        null !== a &&
        a.hasOwnProperty("Content-Type") &&
        "application/json" === a["Content-Type"]
      ) {
        let s,
          u = e.substring(1, e.length);
        try {
          s = JSON.parse(o);
        } catch (l) {}
        return g.hasOwnProperty(u)
          ? g[u].call(null, t.toLowerCase(), i, s)
          : ((i.status = 404), "");
      }
      return ((i.status = 500), "");
    },
    g = {
      getitems: function (t, e) {
        if ("get" === t.toLowerCase()) {
          var n = [];
          for (var r in f) n.push(f[r]);
          return ((e.status = 200), JSON.stringify(n));
        }
        return ((e.status = 405), "");
      },
      getitem: function (t, e, n) {
        if ("get" === t.toLowerCase()) {
          var r;
          return ("number" != typeof n && "string" != typeof n) ||
            !f.hasOwnProperty(n)
            ? ((e.status = 204), JSON.stringify({}))
            : ((r = f[n]), (e.status = 200), JSON.stringify(r));
        }
        return ((e.status = 405), "");
      },
      putitem: function (t, e, n) {
        return "put" === t.toLowerCase()
          ? "object" == typeof n &&
            null !== n &&
            n.hasOwnProperty("date") &&
            n.hasOwnProperty("text") &&
            n.hasOwnProperty("active") &&
            n.hasOwnProperty("userId")
            ? (n.hasOwnProperty("id") && f.hasOwnProperty(n.id)
                ? (f[n.id] = n)
                : ((n.id = a++), (f[n.id] = n)),
              (e.status = 200),
              JSON.stringify(n.id))
            : ((e.status = 400), "")
          : ((e.status = 405), "");
      },
      getusers: function (t, e) {
        return "get" === t.toLowerCase()
          ? ((e.status = 200), JSON.stringify(u))
          : ((e.status = 405), "");
      },
      getuser: function (t, e, n) {
        return "get" === t.toLowerCase()
          ? ((n = parseInt(n)),
            !isNaN(n) && n >= 0 && n < u.length
              ? ((e.status = 200), JSON.stringify(u[n]))
              : ((e.status = 400), ""))
          : ((e.status = 405), "");
      },
    },
    y = function () {
      var t = null,
        o = null,
        a = !0,
        s = null,
        u = null,
        l = { "Content-Type": "application/json" },
        f = null,
        p = null,
        c = !1,
        m = {
          onreadystatechange: null,
          readyState: 0,
          response: "",
          responseText: null,
          responseType: "",
          responseURL: "",
          responeXML: null,
          status: 0,
          statusText: "",
          timeout: 0,
          ontimeout: null,
          upload: null,
          withCredentials: !1,
          abort: function () {
            null !== f && clearTimeout(f);
          },
          getAllResponseHeaders: function () {},
          getResponseHeader: function (t) {},
        open: function (e, n, r, i, l) {
            if ("string" != typeof e) throw new Error("Argument: method must be a string");
            if (((t = e.toUpperCase()), "string" != typeof n)){
                (o = n);
                (a = "boolean" === typeof r ? r : a);
                "string" === typeof i && (s = i);
                "string" === typeof l && (u = l);
                // eslint-disable-next-line no-unused-expressions
                "function" === typeof m.onreadystatechange && ((m.readyState = 1) , setTimeout(m.onreadystatechange, 1));
                throw new Error("Argument: url must be a string");
            }
        },
          overrideMimeType: function () {},
          send: function (g) {
            if (((g = "string" == typeof g ? g : ""), null === f))
              if (
                    ("function" == typeof m.onreadystatechange && ((m.readyState = 2), setTimeout(m.onreadystatechange, 0)),
                    m.timeout > 0 && null === p &&
                        (p = setTimeout(function () {
                            (p = null);
                            (c = !0);
                            null !== f && clearTimeout(f);
                            (m.readyState = 4);
                            "function" == typeof m.ontimeout &&
                                setTimeout(m.ontimeout, 1);
                            "function" == typeof m.onreadystatechange &&
                                setTimeout(m.onreadystatechange, 1);
                        }, m.timeout)),
                        Math.random() >= r
                    )
                ) {
                const y = function () {
                    (f = null);
                    null !== p && clearTimeout(p);
                    (m.responseText = d(t, o, s, u, g, l, m));
                    // eslint-disable-next-line no-unused-expressions
                    "function" === typeof m.onreadystatechange && ((m.readyState = 4) , m.onreadystatechange());
                };
                if (a) f = setTimeout(y, i(e, n));
                else {
                  for (
                    let h = new Date().getTime() + i(e, n);
                    new Date().getTime() < h;
                  );
                  if (c) return;
                  setTimeout(y, 0);
                }
              } else if (!a)
                if (m.timeout > 0) for (; c; );
                else{
                  for (
                    let h = new Date().getTime() + m.timeout;
                    !c || new Date().getTime() < h;
                  );
                }
          },
          setRequestHeaders: function (t, e) {
            if (
              "number" != typeof t &&
              "string" != typeof t &&
              "number" != typeof e &&
              "string" != typeof e
            )
              throw new Error(
                "Arguments both header and value must be numbers or strings"
              );
            l[t] = e;
          },
        };
      return m;
    };
  return { XMLHttpRequest: y };
})();

var x = api.XMLHttpRequest();
x.onreadystatechange = function() {
    console.log(x.readyState, x.status, x.responseText);
};
x.open("GET", "/getusers");
x.send();