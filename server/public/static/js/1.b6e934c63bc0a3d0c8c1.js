webpackJsonp([1],{"1Ori":function(t,e,a){"use strict";var n=a("Dd8w"),r=a.n(n),s=a("NYxO"),i=a("PJh5"),u=a.n(i),o=a("ThXO");e.a={components:{ModalEditBudget:o.a},props:["item"],computed:r()({},Object(s.b)(["turnover","budgetDate"]),{availableClass:function(){return{"a-positive":this.item.available>0,"a-negative":this.item.available<0,"a-zero":0===Number(this.item.available)&&!this.goalNotOnTrack,"a-cautious":this.goalNotOnTrack}},modalNameEditCategory:function(){return"edit-cat-"+this.item.category_id},modalNameShowTransaction:function(){return"transactions-cat-"+this.item.category_id},goalNotOnTrack:function(){var t=u()(this.item.goal_enddate).diff(u()(this.budgetDate).toDate(),"month",!0)+1,e=Number(this.item.goal_amount)-Number(this.item.available),a=Number((e+Number(this.item.budgeted))/t).toFixed(2);return!!(this.item.goal_enddate&&a&&a>0&&a>Number(this.item.budgeted))}}),methods:{editBudget:function(){this.$modal.show(this.modalNameEditCategory)}}}},"3sUX":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("modal",{staticClass:"modal-popup",attrs:{name:t.name,width:300,height:"auto","pivot-y":.3},on:{opened:t.opened}},[a("div",{staticClass:"modal-content"},[a("div",{staticClass:"fieldset"},[a("label",[t._v(t._s(t.item.category_name)+":")]),t._v(" "),a("div",[a("div",[a("vue-numeric",{staticClass:"input-primary",attrs:{currency:"€","currency-symbol-position":"suffix",separator:".",minus:!0,precision:2},model:{value:t.amount,callback:function(e){t.amount=e},expression:"amount"}})],1)])])]),t._v(" "),a("div",{staticClass:"modal-actions"},[a("button",{staticClass:"button button-primary",on:{click:function(e){t.save()}}},[t._v("\n        Save\n    ")]),t._v(" "),a("button",{staticClass:"button btn-cancel",on:{click:function(e){t.close()}}},[t._v("\n        Cancel\n    ")])])])},r=[],s={render:n,staticRenderFns:r};e.a=s},DE31:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"pure-g budget-item"},[a("div",{staticClass:"pure-u-11-24 budget-item-name"},[t._v("\n      "+t._s(t.item.category_name)+"\n    ")]),t._v(" "),a("div",{staticClass:"pure-u-7-24 budgeted",on:{click:function(e){t.editBudget()}}},[t._v("\n      "+t._s(t._f("currency")(t.item.budgeted))+"\n    ")]),t._v(" "),a("div",{staticClass:"pure-u-6-24"},[a("span",{staticClass:"available fr",class:t.availableClass},[t._v(t._s(t._f("currency")(t.item.available)))])])]),t._v(" "),a("modal-edit-budget",{attrs:{name:t.modalNameEditCategory,item:t.item}})],1)},r=[],s={render:n,staticRenderFns:r};e.a=s},EAHD:function(t,e,a){"use strict";var n=a("1Ori"),r=a("DE31"),s=a("VU/8"),i=s(n.a,r.a,!1,null,null,null);e.a=i.exports},F5R5:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("uAL9"),r=a("dyaS"),s=a("VU/8"),i=s(n.a,r.a,!1,null,null,null);e.default=i.exports},KlhB:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{width:"100%",height:"100%"}},[0!==t.index?a("div",{staticClass:"divider"}):t._e(),t._v(" "),a("div",{staticClass:"pure-g budget-group"},[a("div",{staticClass:"pure-u-11-24 budget-header-name"},[t._v("\n      "+t._s(t.group.header.categorygroup_name)+"\n    ")]),t._v(" "),a("div",{staticClass:"pure-u-7-24 budget-header budget-header-budgeted"},[a("div",[t._v("Budgeted")]),t._v(" "),a("div",[t._v(t._s(t._f("currency")(t.group.header.budgeted)))])]),t._v(" "),a("div",{staticClass:"pure-u-6-24 budget-header budget-header-available"},[a("div",[t._v("Available")]),t._v(" "),a("div",[t._v(t._s(t._f("currency")(t.group.header.available)))])])]),t._v(" "),t._l(t.group.items,function(t){return a("budget-group-item",{key:t.id,attrs:{item:t}})})],2)},r=[],s={render:n,staticRenderFns:r};e.a=s},ThXO:function(t,e,a){"use strict";var n=a("tLVR"),r=a("3sUX"),s=a("VU/8"),i=s(n.a,r.a,!1,null,null,null);e.a=i.exports},dyaS:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{height:"100%"}},[a("div",{staticClass:"pure-g header"},[a("div",{staticClass:"pure-u-1-3 header-cancel"},[a("i",{staticClass:"fa fa-chevron-circle-left budget-header-icon budget-left",on:{click:function(e){t.goToLastMonth()}}})]),t._v(" "),a("div",{staticClass:"pure-u-1-3 header-text",on:{click:function(e){t.switchBudget()}}},[t._v("\n      "+t._s(t.budgetDateFormatted)+"\n    ")]),t._v(" "),a("div",{staticClass:"pure-u-1-3 header-logout"},[a("span",[a("i",{staticClass:"fa fa-chevron-circle-right budget-header-icon budget-right",on:{click:function(e){t.goToNextMonth()}}})])])]),t._v(" "),a("div",{staticClass:"pure-g to-be-budgeted",class:Number(t.toBeBudgeted)>=0?"a-positive":"a-negative"},[t._m(0),t._v(" "),a("div",{staticClass:"pure-u-1-2 to-be-budgeted-amount",staticStyle:{"line-height":"0.5 !important"}},[t._v(t._s(t._f("currency")(t.toBeBudgeted)))])]),t._v(" "),a("div",{staticClass:"content3"},[a("div",{staticClass:"pure-g add-list"},t._l(t.budgetListFiltered,function(t,e){return a("budget-group",{key:t.header.categorygroup_id,attrs:{group:t,index:e}})}))]),t._v(" "),a("div",{staticClass:"pure-g footer"},[a("button",{staticClass:"pure-u-1-3 active",on:{click:function(e){t.goTo("budget")}}},[t._m(1),t._v(" "),a("div",{staticClass:"footer-text"},[t._v("Budget")])]),t._v(" "),a("button",{staticClass:"pure-u-1-3",on:{click:function(e){t.goTo("turnover")}}},[t._m(2),t._v(" "),a("div",{staticClass:"footer-text"},[t._v("Account")])]),t._v(" "),a("button",{staticClass:"pure-u-1-3",on:{click:function(e){t.goTo("turnoverAddAmount")}}},[t._m(3),t._v(" "),a("div",{staticClass:"footer-text"},[t._v("Transaction")])])])])},r=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pure-u-1-2"},[a("div",{staticStyle:{"line-height":"0.85 !important"}},[t._v("TO BE BUDGETED")])])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i",{staticClass:"fa fa-envelope footer-icon"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i",{staticClass:"fa fa-university footer-icon"})])},function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("i",{staticClass:"fa fa-plus-circle footer-icon"})])}],s={render:n,staticRenderFns:r};e.a=s},qlqC:function(t,e,a){"use strict";var n=a("EAHD");e.a={components:{BudgetGroupItem:n.a},props:["group","index"]}},tLVR:function(t,e,a){"use strict";var n=a("Xxa5"),r=a.n(n),s=a("exGp"),i=a.n(s),u=a("Dd8w"),o=a.n(u),c=a("NYxO");e.a={props:["name","item"],data:function(){return{amount:0}},computed:o()({},Object(c.b)(["budgetDate"]),{budgetedData:function(){return{categoryId:Number(this.item.category_id),budgetedDate:this.budgetDate,amount:this.amount}}}),methods:{opened:function(){this.amount=""},close:function(){this.$modal.hide(this.name)},save:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("updateBudgeted",t.budgetedData);case 3:return e.next=5,t.getBudget();case 5:t.$toasted.success("Budgeted updated."),t.close(),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),t.$toasted.error("There was an error updating the budget.");case 12:case"end":return e.stop()}},e,t,[[0,9]])}))()},getBudget:function(){var t=this;return i()(r.a.mark(function e(){return r.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("getToBeBudgeted",t.budgetDate);case 3:return e.next=5,t.$store.dispatch("getBudgetList",t.budgetDate);case 5:e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),t.$toasted.error("There was an error getting the budget list.");case 10:case"end":return e.stop()}},e,t,[[0,7]])}))()}}}},u2au:function(t,e,a){"use strict";var n=a("qlqC"),r=a("KlhB"),s=a("VU/8"),i=s(n.a,r.a,!1,null,null,null);e.a=i.exports},uAL9:function(t,e,a){"use strict";var n=a("Dd8w"),r=a.n(n),s=a("Xxa5"),i=a.n(s),u=a("exGp"),o=a.n(u),c=a("NYxO"),d=a("r4OS"),l=a("PJh5"),g=a.n(l),v=a("u2au"),h=function(){var t=o()(i.a.mark(function t(e,a){var n;return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:n=0;case 1:if(!(n<e.length)){t.next=7;break}return t.next=4,a(e[n],n,e);case 4:n++,t.next=1;break;case 7:case"end":return t.stop()}},t,this)}));return function(e,a){return t.apply(this,arguments)}}();e.a={components:{BudgetGroup:v.a},computed:r()({},Object(c.b)(["budgetDate","budgetList","toBeBudgeted","user"]),{budgetListFiltered:function(){var t=[],e=[];return this.budgetList.forEach(function(a){a.header.categorygroup_is_hidden||(e=a.items.filter(function(t){return!t.category_is_hidden}),t.push({header:a.header,items:e}))}),t},budgetDateFormatted:function(){return g()(this.budgetDate).format("MMM YYYY")}}),methods:{goTo:function(t){this.$router.push({name:t})},switchBudget:function(){var t=this;return o()(i.a.mark(function e(){var a;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("/api/budgets?userid="+t.user.id);case 2:if(a=e.sent,2!==a.data.length){e.next=14;break}return e.next=6,h(a.data,function(){var e=o()(i.a.mark(function e(a){return i.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,d.a.put("/api/budgets/"+a.id,{active:!a.active});case 2:case"end":return t.stop()}},e,t)}));return function(t){return e.apply(this,arguments)}}());case 6:return e.next=8,t.$store.dispatch("getBudgetId",t.$store.getters.user);case 8:t.$store.dispatch("getAccounts"),t.$store.dispatch("getTurnovers"),t.$store.dispatch("getToBeBudgeted",t.budgetDate),t.$store.dispatch("getBudgetList",t.budgetDate),e.next=15;break;case 14:t.$toasted.show("No other budget found.");case 15:case"end":return e.stop()}},e,t)}))()},goToLastMonth:function(){var t=g()(this.budgetDate).subtract(1,"months").format("YYYYMM01");this.$store.dispatch("setBudgetDate",t),this.getBudget()},goToNextMonth:function(){var t=g()(this.budgetDate).add(1,"months").format("YYYYMM01");this.$store.dispatch("setBudgetDate",t),this.getBudget()},logout:function(){var t=this;return o()(i.a.mark(function e(){return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,t.$store.dispatch("logout");case 3:t.$router.push({name:"login"}),e.next=9;break;case 6:throw e.prev=6,e.t0=e.catch(0),new Error(e.t0);case 9:case"end":return e.stop()}},e,t,[[0,6]])}))()},getBudget:function(){this.$store.dispatch("getBudgetList",this.budgetDate),this.$store.dispatch("getToBeBudgeted",this.budgetDate)}},created:function(){this.getBudget()}}}});