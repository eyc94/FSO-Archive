(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{41:function(e,n,t){},42:function(e,n,t){"use strict";t.r(n);var c=t(16),r=t.n(c),a=t(7),o=t(3),u=t(1),i=t(0),s=function(e){return Object(i.jsxs)("div",{children:["filter shown with ",Object(i.jsx)("input",{value:e.value,onChange:e.changeHandler})]})},l=function(e){return Object(i.jsx)(i.Fragment,{children:Object(i.jsxs)("form",{onSubmit:e.submitHandler,children:[Object(i.jsxs)("div",{children:["name: ",Object(i.jsx)("input",{value:e.name,onChange:e.nameHandler})]}),Object(i.jsxs)("div",{children:["number: ",Object(i.jsx)("input",{value:e.number,onChange:e.numberHandler})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",children:"add"})})]})})},d=function(e){return Object(i.jsx)(i.Fragment,{children:Object(i.jsx)("button",{onClick:e.delPerson,children:e.text})})},j=function(e){return Object(i.jsx)(i.Fragment,{children:e.displayArray.map((function(n){return Object(i.jsxs)("div",{children:[n.name," ",n.number,Object(i.jsx)(d,{delPerson:function(){return e.delPerson(n)},text:"delete"})]},n.name)}))})},b=function(e){var n=e.message,t=e.classType;return null===n?null:Object(i.jsx)("div",{className:t,children:n})},f=t(4),h=t.n(f),m="http://localhost:3001/api/persons",O=function(){return h.a.get(m).then((function(e){return e.data}))},x=function(e){return h.a.post(m,e).then((function(e){return e.data}))},v=function(e){return h.a.delete("".concat(m,"/").concat(e))},p=function(e,n){return h.a.put("".concat(m,"/").concat(e),n).then((function(e){return e.data}))},g=(t(41),function(){var e=Object(u.useState)([]),n=Object(o.a)(e,2),t=n[0],c=n[1],r=Object(u.useState)(""),d=Object(o.a)(r,2),f=d[0],h=d[1],m=Object(u.useState)(""),g=Object(o.a)(m,2),w=g[0],y=g[1],C=Object(u.useState)(""),H=Object(o.a)(C,2),k=H[0],S=H[1],L=Object(u.useState)(null),A=Object(o.a)(L,2),P=A[0],T=A[1],F=Object(u.useState)(""),D=Object(o.a)(F,2),E=D[0],I=D[1];Object(u.useEffect)((function(){console.log("effect"),O().then((function(e){c(e)}))}),[]);var J=t.filter((function(e){return e.name.toLowerCase().includes(k.toLowerCase())}));return Object(i.jsxs)("div",{children:[Object(i.jsx)("h2",{children:"Phonebook"}),Object(i.jsx)(b,{message:P,classType:E}),Object(i.jsx)(s,{value:k,changeHandler:function(e){S(e.target.value)}}),Object(i.jsx)("h2",{children:"Add a new"}),Object(i.jsx)(l,{submitHandler:function(e){e.preventDefault();var n={name:f,number:w};if(t.filter((function(e){return e.name.toLowerCase()===f.toLowerCase()})).length>0){var r="".concat(f," is already added to the phonebook, replace the old number with a new one?");if(window.confirm(r)){var o=t.filter((function(e){return e.name.toLowerCase()===f.toLowerCase()}))[0],u=Object(a.a)(Object(a.a)({},o),{},{number:w});p(o.id,u).then((function(e){I("success"),c(t.map((function(n){return n.id!==o.id?n:e}))),T("Added ".concat(e.name)),setTimeout((function(){T(null)}),5e3)})).catch((function(e){I("error"),T("Information of ".concat(o.id," has already been removed from the server")),setTimeout((function(){T(null)}),5e3),c(t.filter((function(e){return e.id!==o.id})))}))}}else x(n).then((function(e){I("success"),c(t.concat(e)),T("Added ".concat(e.name)),setTimeout((function(){T(null)}),5e3)}));h(""),y("")},name:f,nameHandler:function(e){h(e.target.value)},number:w,numberHandler:function(e){y(e.target.value)}}),Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)(j,{delPerson:function(e){var n=e.id,r=e.name,a="Delete ".concat(r,"?");window.confirm(a)&&v(n).then((function(e){c(t.filter((function(e){return e.id!==n})))}))},displayArray:J})]})});r.a.render(Object(i.jsx)(g,{}),document.getElementById("root"))}},[[42,1,2]]]);
//# sourceMappingURL=main.327ac6d0.chunk.js.map