function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{TUkU:function(e,t,n){"use strict";n.r(t),n.d(t,"Tab2PageModule",(function(){return F}));var i,o=n("TEn/"),r=n("ofXK"),s=n("3Pt+"),l=n("tyNb"),c=n("mrSG"),a=n("fXoL"),u=((i=function(){function e(){_classCallCheck(this,e),this.currentItemList=[],this.subItemList=[],this.currentPersons=[]}return _createClass(e,[{key:"loadDataFromLocal",value:function(){localStorage.getItem("currentItemList").length>0&&(this.currentItemList=JSON.parse(localStorage.getItem("currentItemList"))),localStorage.getItem("currentPersons").length>0&&(this.currentPersons=JSON.parse(localStorage.getItem("currentPersons")))}},{key:"addPerson",value:function(e){this.currentPersons.push({Name:e,Status:"Active"}),localStorage.setItem("currentPersons",JSON.stringify(this.currentPersons))}},{key:"removePerson",value:function(e){for(var t=0;t<this.currentPersons.length;t++)if(this.currentPersons[t].Name==e)return console.log("found em"),void this.currentPersons.splice(t,1);localStorage.setItem("currentPersons",JSON.stringify(this.currentPersons))}},{key:"addItem",value:function(e,t,n,i){var o=(new Date).toLocaleDateString();console.log(o);var r={Name:e,Status:!1,Color:t,Children:[],Parent:n,Visible:!0,AssignedDate:o,AssignedTo:i,ChildrenVisible:!0};if("none"!==n){for(var s,l=0;l<this.currentItemList.length;l+=1)(s=this.findNode(n,"Name",this.currentItemList[l]))&&s.Children.push(r);console.log(s)}else this.currentItemList.push(r);localStorage.setItem("currentItemList",JSON.stringify(this.currentItemList))}},{key:"checkForDupes",value:function(e){return this.findAllNodesWith(e,"Name",this.currentItemList,this.strictMatch)}},{key:"hideUnsearched",value:function(e){if(e.length>1){this.findAllNodesWithout(e,"Name",this.currentItemList,this.partialMatch).forEach((function(e){e.Visible=!1}));var t=this.findAllNodesWith(e,"Name",this.currentItemList,this.partialMatch);t.forEach((function(e){e.Visible=!0})),console.log(t)}else{var n=this.findAllNodesWith(!1,"Visible",this.currentItemList,this.strictMatch);console.log(n),n.forEach((function(e){e.Visible=!0}))}}},{key:"strictMatch",value:function(e,t){return e===t}},{key:"partialMatch",value:function(e,t){return t.toLowerCase().indexOf(e.toLowerCase())>-1}},{key:"showOnlyFinished",value:function(){this.findAllNodesWith(!0,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!0})),this.findAllNodesWith(!1,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!1}))}},{key:"showOnlyUnfinished",value:function(){this.findAllNodesWith(!1,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!0})),this.findAllNodesWith(!0,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!1}))}},{key:"showAll",value:function(){this.findAllNodesWith(!1,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!0})),this.findAllNodesWith(!0,"Status",this.currentItemList,this.strictMatch).forEach((function(e){e.Visible=!0}))}},{key:"toggleItemStatus",value:function(e){for(var t,n=0;n<this.currentItemList.length;n++)(t=this.findNode(e.Name,"Name",this.currentItemList[n]))&&t.Name==e.Name&&(t.Status=!t.Status);e.Children.length>-1&&this.findAllNodesWith(!t.Status,"Status",t.Children,this.strictMatch).forEach((function(e){e.Status=t.Status}))}},{key:"removeItem",value:function(e){for(var t,n=0;n<this.currentItemList.length;n++)if("none"!==e.Parent){if(t=this.findNode(e.Parent,"Name",this.currentItemList[n]),console.log(t),t&&t.Name==e.Parent)return void(t.Children=t.Children.filter((function(t){return t.Name!=e.Name})))}else if(this.currentItemList[n].Name==e.Name)return void this.currentItemList.splice(n,1)}},{key:"findNode",value:function(e,t,n){var i,o;if(n){if(e==n[t])return n;for(i=0;i<=n.Children.length;i++)if(o=this.findNode(e,t,n.Children[i]))return o;o=!1,o=!1}}},{key:"findMultipleNodes",value:function(e,t,n,i,o){var r;if(n)for(o?i(e,n[t])||this.subItemList.push(n):i(e,n[t])&&this.subItemList.push(n),r=0;r<=n.Children.length;r++)this.findMultipleNodes(e,t,n.Children[r],i,o)}},{key:"cascadeItem",value:function(e){if(1==e.ChildrenVisible&&e.Children.length>-1)(t=this.findAllNodesWith(!0,"Visible",e.Children,this.strictMatch)).forEach((function(e){e.Visible=!1})),e.ChildrenVisible=!1,console.log(t);else if(e.Children.length>-1){var t;(t=this.findAllNodesWith(!1,"Visible",e.Children,this.strictMatch)).forEach((function(e){e.Visible=!0})),e.ChildrenVisible=!0,console.log(t)}}},{key:"findAllNodesWith",value:function(e,t,n,i){if(this.subItemList.length=0,n!==[])for(var o=0;o<n.length;o++)this.findMultipleNodes(e,t,n[o],i,!1);return this.subItemList}},{key:"findAllNodesWithout",value:function(e,t,n,i){if(this.subItemList.length=0,n!==[])for(var o=0;o<n.length;o++)this.findMultipleNodes(e,t,n[o],i,!0);return this.subItemList}}]),e}()).\u0275fac=function(e){return new(e||i)},i.\u0275prov=a.Fb({token:i,factory:i.\u0275fac,providedIn:"root"}),i);function h(e,t){if(1&e&&(a.Nb(0,"ion-select-option",14),a.lc(1),a.Mb()),2&e){var n=t.$implicit;a.cc("value",n.Name),a.zb(1),a.nc(" ",n.Name," ")}}function b(e,t){if(1&e){var n=a.Ob();a.Nb(0,"ion-item"),a.Nb(1,"ion-label"),a.lc(2,"Person's Name: "),a.Mb(),a.Kb(3,"ion-input",15),a.Nb(4,"ion-button",16),a.Vb("click",(function(){return a.gc(n),a.Yb().onAddNewPerson()})),a.lc(5," Go! "),a.Mb(),a.Mb()}}function d(e,t){1&e&&a.Lb(0)}function m(e,t){if(1&e&&(a.Nb(0,"ion-select-option",14),a.lc(1),a.Mb()),2&e){var n=t.$implicit;a.cc("value",n.Name),a.zb(1),a.nc(" ",n.Name," ")}}function f(e,t){1&e&&a.Lb(0)}var g=function(e){return{list:e}};function v(e,t){if(1&e&&(a.Nb(0,"div"),a.jc(1,f,1,0,"ng-container",9),a.Mb()),2&e){var n=a.Yb().$implicit;a.Yb(2);var i=a.fc(33);a.zb(1),a.bc("ngTemplateOutlet",i)("ngTemplateOutletContext",a.dc(2,g,n.Children))}}function p(e,t){if(1&e&&(a.Nb(0,"div"),a.Nb(1,"ion-select-option",18),a.lc(2),a.Mb(),a.jc(3,v,2,4,"div",6),a.Mb()),2&e){var n=t.$implicit;a.zb(1),a.cc("value",n.Name),a.zb(1),a.mc(n.Name),a.zb(1),a.bc("ngIf",n.Children.length>0)}}function N(e,t){1&e&&a.jc(0,p,4,3,"div",17),2&e&&a.bc("ngForOf",t.list)}var M,I=((M=function(){function e(t,n){_classCallCheck(this,e),this.modalCtrl=t,this.stor=n,this.currentItems=[],this.currentPersons=[],this.newPersonFlag=!1}return _createClass(e,[{key:"ngOnInit",value:function(){this.currentItems=this.stor.currentItemList,this.currentPersons=this.stor.currentPersons}},{key:"comparePersonSelected",value:function(e){console.log(e),"new"==document.getElementById("itemAssignedTo").value&&(console.log("new person detected!"),this.newPersonFlag=!0)}},{key:"onAddNewPerson",value:function(){var e=document.getElementById("newPersonName").value;this.stor.addPerson(e),this.currentPersons=this.stor.currentPersons,document.getElementById("itemAssignedTo").value=e,this.newPersonFlag=!1}},{key:"removePerson",value:function(){var e=document.getElementById("peopleRemover").value;document.getElementById("peopleRemover").value="",this.stor.removePerson(e),this.currentPersons=this.stor.currentPersons}},{key:"onAddItemConfirmed",value:function(){var e=document.getElementById("itemName").value,t=document.getElementById("itemAssignedTo").value,n=document.getElementById("itemParent").value,i=this.stor.checkForDupes(e);console.log(i),e.length>4?0==i.length?(this.stor.addItem(e,"primary",n,t),this.dismissModal()):this.triggerErrorMsg("That task already exists!"):this.triggerErrorMsg("Minimum 5 characters please!")}},{key:"triggerErrorMsg",value:function(e){var t=this;document.getElementById("taskNameWarning").innerText=e,setTimeout((function(){t.hideErrorMsg()}),1500)}},{key:"hideErrorMsg",value:function(){document.getElementById("taskNameWarning").innerText=""}},{key:"dismissModal",value:function(){return Object(c.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.modalCtrl.dismiss();case 2:case"end":return e.stop()}}),e,this)})))}}]),e}()).\u0275fac=function(e){return new(e||M)(a.Jb(o.H),a.Jb(u))},M.\u0275cmp=a.Db({type:M,selectors:[["app-add-item-modal"]],decls:34,vars:7,consts:[["slot","end","type","text","placeholder","dishes?","id","itemName","minlength","5","maxlength","32"],["value","none","id","itemAssignedTo",3,"ionChange"],["slot","start","value","none"],["slot","end",3,"value",4,"ngFor","ngForOf"],["slot","start","value","new"],["name","add"],[4,"ngIf"],["value","none","id","itemParent"],["value","none"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["slot","end","id","taskNameWarning","color","danger"],[3,"click"],["value","none","id","peopleRemover"],["recursiveListTmpl",""],["slot","end",3,"value"],["slot","end","type","text","placeholder","nathan?","id","newPersonName","minlength","5","maxlength","32"],["slot","end",3,"click"],[4,"ngFor","ngForOf"],[3,"value"]],template:function(e,t){if(1&e&&(a.Nb(0,"ion-list"),a.Nb(1,"ion-item"),a.Nb(2,"ion-label"),a.lc(3,"Task Name: "),a.Mb(),a.Kb(4,"ion-input",0),a.Mb(),a.Nb(5,"ion-item"),a.Nb(6,"ion-label"),a.lc(7,"Assigned To: "),a.Mb(),a.Nb(8,"ion-select",1),a.Vb("ionChange",(function(e){return t.comparePersonSelected(e)})),a.Kb(9,"ion-select-option",2),a.jc(10,h,2,2,"ion-select-option",3),a.Nb(11,"ion-select-option",4),a.Nb(12,"ion-icon",5),a.lc(13,"New Person?"),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.jc(14,b,6,0,"ion-item",6),a.Nb(15,"ion-item"),a.Nb(16,"ion-label"),a.lc(17,"Stacked Under: "),a.Mb(),a.Nb(18,"ion-select",7),a.Kb(19,"ion-select-option",8),a.jc(20,d,1,0,"ng-container",9),a.Mb(),a.Mb(),a.Kb(21,"ion-text",10),a.Nb(22,"ion-item"),a.Nb(23,"ion-button",11),a.Vb("click",(function(){return t.onAddItemConfirmed()})),a.lc(24,"Add It!"),a.Mb(),a.Mb(),a.Mb(),a.Nb(25,"ion-item"),a.Nb(26,"ion-label"),a.lc(27,"Need to remove a person? "),a.Mb(),a.Nb(28,"ion-select",12),a.jc(29,m,2,2,"ion-select-option",3),a.Mb(),a.Nb(30,"ion-button",11),a.Vb("click",(function(){return t.removePerson()})),a.lc(31," Delete "),a.Mb(),a.Mb(),a.jc(32,N,1,1,"ng-template",null,13,a.kc)),2&e){var n=a.fc(33);a.zb(10),a.bc("ngForOf",t.currentPersons),a.zb(4),a.bc("ngIf",t.newPersonFlag),a.zb(6),a.bc("ngTemplateOutlet",n)("ngTemplateOutletContext",a.dc(5,g,t.currentItems)),a.zb(9),a.bc("ngForOf",t.currentPersons)}},directives:[o.r,o.l,o.q,o.k,o.K,o.x,o.J,o.y,r.h,o.j,r.i,r.j,o.C,o.b],styles:[""]}),M);function C(e,t){1&e&&a.Lb(0)}function k(e,t){if(1&e){var n=a.Ob();a.Nb(0,"div"),a.Nb(1,"ion-item-group"),a.Nb(2,"ion-item-sliding"),a.Nb(3,"ion-item-options",18),a.Nb(4,"ion-item-option",19),a.Vb("click",(function(){a.gc(n);var e=a.Yb().$implicit;return a.Yb(2).cascadeItem(e)})),a.lc(5),a.Mb(),a.Nb(6,"ion-item-option",20),a.Vb("click",(function(){a.gc(n);var e=a.Yb().$implicit;return a.Yb(2).changeItemStatus(e)})),a.lc(7,"Finished?"),a.Mb(),a.Nb(8,"ion-item-option",21),a.lc(9),a.Mb(),a.Mb(),a.Nb(10,"ion-item"),a.Nb(11,"ion-title"),a.Nb(12,"ion-label",22),a.lc(13),a.Mb(),a.Mb(),a.Mb(),a.Nb(14,"ion-item-options",23),a.Nb(15,"ion-item-option",24),a.Vb("click",(function(){a.gc(n);var e=a.Yb().$implicit;return a.Yb(2).removeItem(e)})),a.lc(16,"Delete?"),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Mb()}if(2&e){var i=a.Yb().$implicit,o=a.Yb(2);a.zb(5),a.mc(i.Children.length),a.zb(4),a.oc("Created on: ",i.AssignedDate,", Assigned to: ",i.AssignedTo,""),a.zb(3),a.cc("color",o.getColorForItem(i.Status)),a.zb(1),a.mc(i.Name)}}function y(e,t){1&e&&a.Lb(0)}var P=function(e){return{list:e}};function L(e,t){if(1&e&&(a.Nb(0,"div"),a.Nb(1,"ul"),a.Nb(2,"li"),a.jc(3,y,1,0,"ng-container",14),a.Mb(),a.Mb(),a.Mb()),2&e){var n=a.Yb().$implicit;a.Yb(2);var i=a.fc(35);a.zb(3),a.bc("ngTemplateOutlet",i)("ngTemplateOutletContext",a.dc(2,P,n.Children))}}function w(e,t){if(1&e&&(a.Nb(0,"div"),a.jc(1,k,17,5,"div",17),a.jc(2,L,4,4,"div",17),a.Mb()),2&e){var n=t.$implicit;a.zb(1),a.bc("ngIf",n.Visible),a.zb(1),a.bc("ngIf",n.Children.length>0&&1==n.ChildrenVisible&&1==n.Visible)}}function O(e,t){1&e&&a.jc(0,w,3,2,"div",16),2&e&&a.bc("ngForOf",t.list)}var S,A,E,V=[{path:"",component:(S=function(){function e(t,n){_classCallCheck(this,e),this.modalCtrl=t,this.stor=n,this.itemList=[],this.showUnfinishedFlag=!1}return _createClass(e,[{key:"ngOnInit",value:function(){this.stor.loadDataFromLocal(),this.itemList=this.stor.currentItemList}},{key:"presentModal",value:function(){return Object(c.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var t,n=this;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,this.modalCtrl.create({component:I});case 2:return(t=e.sent).onDidDismiss().then((function(){n.getCurrentItems()})),e.next=6,t.present();case 6:return e.abrupt("return",e.sent);case 7:case"end":return e.stop()}}),e,this)})))}},{key:"getCurrentItems",value:function(){this.itemList=this.stor.currentItemList}},{key:"getColorForItem",value:function(e){return 0==e?"dark":"medium"}},{key:"changeItemStatus",value:function(e){this.stor.toggleItemStatus(e),this.getCurrentItems()}},{key:"removeItem",value:function(e){this.stor.removeItem(e),this.getCurrentItems()}},{key:"cascadeItem",value:function(e){this.stor.cascadeItem(e),this.getCurrentItems()}},{key:"onSearch",value:function(e){this.stor.hideUnsearched(e.srcElement.value)}},{key:"filterChanged",value:function(e){console.log(e),"unfinished"==e.srcElement.value?this.stor.showOnlyUnfinished():"finished"==e.srcElement.value?this.stor.showOnlyFinished():this.stor.showAll()}}]),e}(),S.\u0275fac=function(e){return new(e||S)(a.Jb(o.H),a.Jb(u))},S.\u0275cmp=a.Db({type:S,selectors:[["app-tab2"]],decls:36,vars:6,consts:[[3,"translucent"],[3,"fullscreen"],["collapse","condense"],["size","large"],["horizontal","end","vertical","top"],[3,"click"],["name","add"],[1,"searchInput"],["color","dark","position","floating",1,"searchInput"],["type","text","placeholder"," Can't find it? ",3,"ionInput"],["value","all",3,"ionChange"],["value","all"],["value","finished"],["value","unfinished"],[4,"ngTemplateOutlet","ngTemplateOutletContext"],["recursiveListTmpl",""],[4,"ngFor","ngForOf"],[4,"ngIf"],["side","start"],["color","primary","name","cascadeButton",3,"click"],["color","success","name","finishedButton",3,"click"],["color","medium"],[3,"color"],["side","end"],["color","danger",3,"click"]],template:function(e,t){if(1&e&&(a.Nb(0,"ion-header",0),a.Nb(1,"ion-toolbar"),a.Nb(2,"ion-title"),a.lc(3," List "),a.Mb(),a.Mb(),a.Mb(),a.Nb(4,"ion-content",1),a.Nb(5,"ion-header",2),a.Nb(6,"ion-toolbar"),a.Nb(7,"ion-title",3),a.lc(8,"List"),a.Mb(),a.Mb(),a.Mb(),a.Nb(9,"ion-fab",4),a.Nb(10,"ion-fab-button",5),a.Vb("click",(function(){return t.presentModal()})),a.Kb(11,"ion-icon",6),a.Mb(),a.Mb(),a.Nb(12,"ion-card"),a.Nb(13,"ion-grid"),a.Nb(14,"ion-row"),a.Nb(15,"ion-col"),a.Nb(16,"ion-item",7),a.Nb(17,"ion-label",8),a.lc(18," Search: "),a.Mb(),a.Nb(19,"ion-input",9),a.Vb("ionInput",(function(e){return t.onSearch(e)})),a.Mb(),a.Mb(),a.Mb(),a.Nb(20,"ion-col"),a.Nb(21,"ion-segment",10),a.Vb("ionChange",(function(e){return t.filterChanged(e)})),a.Nb(22,"ion-segment-button",11),a.Nb(23,"ion-label"),a.lc(24,"All"),a.Mb(),a.Mb(),a.Nb(25,"ion-segment-button",12),a.Nb(26,"ion-label"),a.lc(27,"Completed"),a.Mb(),a.Mb(),a.Nb(28,"ion-segment-button",13),a.Nb(29,"ion-label"),a.lc(30,"Incomplete"),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Mb(),a.Nb(31,"ion-card"),a.Nb(32,"ion-list"),a.jc(33,C,1,0,"ng-container",14),a.Mb(),a.Mb(),a.jc(34,O,1,1,"ng-template",null,15,a.kc),a.Mb()),2&e){var n=a.fc(35);a.bc("translucent",!0),a.zb(4),a.bc("fullscreen",!0),a.zb(29),a.bc("ngTemplateOutlet",n)("ngTemplateOutletContext",a.dc(4,P,t.itemList))}},directives:[o.i,o.E,o.D,o.e,o.f,o.g,o.j,o.c,o.h,o.u,o.d,o.l,o.q,o.k,o.K,o.v,o.J,o.w,o.r,r.j,r.h,r.i,o.m,o.p,o.o,o.n],styles:[".searchInput[_ngcontent-%COMP%]{color:var(--ion-color-steel)}.searchInput[_ngcontent-%COMP%]   input[_ngcontent-%COMP%]{width:100%;padding:8px;border:1px solid var(--ion-color-veryLightBlue);border-radius:2px;background:hsla(0,0%,100%,.5)}.titleField[_ngcontent-%COMP%]{margin-left:8px}"]}),S)}],T=((E=function e(){_classCallCheck(this,e)}).\u0275mod=a.Hb({type:E}),E.\u0275inj=a.Gb({factory:function(e){return new(e||E)},imports:[[l.i.forChild(V)],l.i]}),E),F=((A=function e(){_classCallCheck(this,e)}).\u0275mod=a.Hb({type:A}),A.\u0275inj=a.Gb({factory:function(e){return new(e||A)},imports:[[o.F,r.b,s.a,T]]}),A)}}]);