var _____WB$wombat$assign$function_____ = function(name) {return (self._wb_wombat && self._wb_wombat.local_init && self._wb_wombat.local_init(name)) || self[name]; };
if (!self.__WB_pmw) { self.__WB_pmw = function(obj) { this.__WB_source = obj; return this; } }
{
    let window = _____WB$wombat$assign$function_____("window");
    let self = _____WB$wombat$assign$function_____("self");
    let document = _____WB$wombat$assign$function_____("document");
    let location = _____WB$wombat$assign$function_____("location");
    let top = _____WB$wombat$assign$function_____("top");
    let parent = _____WB$wombat$assign$function_____("parent");
    let frames = _____WB$wombat$assign$function_____("frames");
    let opener = _____WB$wombat$assign$function_____("opener");

    var Icon={questionMarkIcon:"inv_misc_questionmark",sizes:["small","medium","large","blizzard"],sizes2:[18,36,56,64],sizeIds:{small:0,medium:1,large:2,blizzard:3},premiumOffsets:[[-56,-36],[-56,0],[0,0],[0,0]],premiumBorderClasses:["-premium","-gold","","-premiumred","-red",""],STANDARD_BORDER:2,privilegeBorderClasses:{uncommon:"-q2",rare:"-q3",epic:"-q4",legendary:"-q5"},idLookupCache:{},create:function(c,p,j,d,g,n,b,o,l){var i=WH.ce(l?"span":"div");var f=WH.ce("ins");var h=WH.ce("del");if(p==null){p=Icon.sizeIds.medium}i.className="icon"+Icon.sizes[p];WH.ae(i,f);if(!b){WH.ae(i,h)}if(c){Icon.setTexture(i,p,c)}if(d){var k=WH.ce("a");k.href=d;if(d.indexOf("wowhead.com")==-1&&d.substr(0,5)=="http:"){k.target="_blank"}WH.ae(i,k)}else{if(c){var m=i.firstChild.style;var e=(m.backgroundImage.indexOf("/avatars/")!=-1);if(!e){i.onclick=Icon.onClick;if(d!==false){var k=WH.ce("a");k.href="javascript:;";WH.ae(i,k)}}}}if(o&&typeof k!="undefined"){k.rel=o}Icon.setNumQty(i,g,n);return i},createUser:function(c,h,e,b,d,g,a){if(c==2){h=g_staticUrl+"/uploads/avatars/"+h+".jpg"}var f=Icon.create(h,e,null,b,null,null,g);if(d!=Icon.STANDARD_BORDER){if(Icon.premiumBorderClasses[d]){f.className+=" "+f.className+Icon.premiumBorderClasses[d]}}else{if(a&&Icon.privilegeBorderClasses.hasOwnProperty(a)){f.className+=" "+f.className+Icon.privilegeBorderClasses[a]}}if(c==2){Icon.moveTexture(f,e,Icon.premiumOffsets[e][0],Icon.premiumOffsets[e][1],true)}return f},getIdFromName:function(a,b){if(Icon.idLookupCache.hasOwnProperty(a)){window.requestAnimationFrame(function(){b(Icon.idLookupCache[a]||undefined)});return}$.ajax({url:"/icon/get-id-from-name",data:{name:a},dataType:"json",success:function(c){Icon.idLookupCache[a]=c;b(c||undefined)}})},getPrivilegeBorder:function(b){var a=false;if(b>=5000){a="uncommon"}if(b>=10000){a="rare"}if(b>=15000){a="epic"}if(b>=25000){a="legendary"}return a},setUrl:function(b,a){if(!a){a="javascript:;"}Icon.getLink(b).href=a},setTexture:function(d,c,b){var a=d.firstChild.style;if(!b){a.backgroundImage=null;return}if(b.indexOf("/")!=-1){a.backgroundImage="url("+b+")"}else{a.backgroundImage="url("+g_staticUrl+"/images/wow/icons/"+Icon.sizes[c]+"/"+b.toLowerCase()+".jpg)"}Icon.moveTexture(d,c,0,0)},moveTexture:function(e,c,a,f,d){var b=e.firstChild.style;if(a||f){if(d){b.backgroundPosition=a+"px "+f+"px"}else{b.backgroundPosition=(-a*Icon.sizes2[c])+"px "+(-f*Icon.sizes2[c])+"px"}}else{if(b.backgroundPosition){b.backgroundPosition=""}}},setNumQty:function(e,c,f){var b=WH.gE(e,"span");for(var d=0,a=b.length;d<a;++d){if(b[d]){WH.de(b[d])}}if(c!=null&&((c>1&&c<2147483647)||(c.length&&c!="0"&&c!="1"))){b=WH.createTextGlow(c,"q1");b.style.right="0";b.style.bottom="0";b.style.position="absolute";WH.ae(e,b)}if(f!=null&&f>0){b=WH.createTextGlow("("+f+")","q");b.style.left="0";b.style.top="0";b.style.position="absolute";WH.ae(e,b)}},getLink:function(a){return WH.gE(a,"a")[0]},showIconName:function(a){if(a.firstChild){var c=a.firstChild.style;if(c.backgroundImage.length&&(c.backgroundImage.indexOf(g_staticUrl)>=4||g_staticUrl=="")){var d=c.backgroundImage.lastIndexOf("/"),b=c.backgroundImage.indexOf(".jpg");if(d!=-1&&b!=-1){Icon.displayIcon(c.backgroundImage.substring(d+1,b))}}}},onClick:function(){Icon.showIconName(this)},displayIcon:function(a){if(!Dialog.templates.icondisplay){Dialog.templates.icondisplay={title:LANG.icon,width:500,buttons:[["arrow",LANG.original],["x",LANG.close]],fields:[{id:"icon",label:LANG.dialog_imagename,required:1,type:"text",labelAlign:"left",compute:function(d,c,b,f){f.classList.add("icon-dialog-content");var e=this.iconDiv=WH.ce("div");e.update=function(){setTimeout(function(){WH.safeSelect(d)},10);WH.ee(e);WH.ae(e,Icon.create(d.value,2))};WH.ae(e,Icon.create(c,2));WH.ae(f,e);WH.ae(f,d)}},{id:"iconId",label:WH.TERMS.id+WH.TERMS.colon_punct,type:"text",labelAlign:"left",compute:function(d,c,b,e){e.classList.add("icon-dialog-content");d.value="";this.iconIdField=d}},{id:"location",label:" ",required:1,type:"caption",compute:function(f,e,c,b,d){WH.ee(b);b.classList.add("icon-dialog-caption");var g=LANG.dialog_seeallusingicon;g=g.replace("$1",'<a href="/items?filter=142;0;'+this.data.icon+'">'+LANG.types[3][3]+"</a>");g=g.replace("$2",'<a href="/spells?filter=15;0;'+this.data.icon+'">'+LANG.types[6][3]+"</a>");g=g.replace("$3",'<a href="/achievements?filter=10;0;'+this.data.icon+'">'+LANG.types[10][3]+"</a>");b.innerHTML=g}}],onInit:function(b){this.updateIcon=this.template.updateIcon.bind(this,b)},onShow:function(b){this.updateIcon();if(location.hash&&location.hash.indexOf("#icon")==-1){this.oldHash=location.hash}else{this.oldHash=""}var c="#icon";var d=(WH.isSet("g_pageInfo")&&g_pageInfo.type&&WH.inArray([3,6,10],g_pageInfo.type)==-1);if(!d){c+=":"+this.data.icon}location.hash=c},onHide:function(b){if(this.oldHash){WH.setHash(this.oldHash)}else{WH.clearHash()}},updateIcon:function(b){this.iconDiv.update();var c=this.iconIdField;Icon.getIdFromName(b.icon.value,function(d){c.value=d||""})},onSubmit:function(b,e,c,d){if(c=="arrow"){var f=window.open(g_staticUrl+"/images/wow/icons/large/"+e.icon.toLowerCase()+".jpg","_blank");f.focus();return false}return true}}}if(!Icon.icDialog){Icon.icDialog=new Dialog()}Icon.icDialog.show("icondisplay",{data:{icon:a}})},checkPound:function(){if(location.hash&&location.hash.indexOf("#icon")==0){var b=location.hash.split(":");var a=false;if(b.length==2){a=b[1]}else{if(b.length==1&&WH.isSet("g_pageInfo")){switch(g_pageInfo.type){case 3:a=g_items[g_pageInfo.typeId].icon.toLowerCase();break;case 6:a=g_spells[g_pageInfo.typeId].icon.toLowerCase();break;case 10:a=g_achievements[g_pageInfo.typeId].icon.toLowerCase();break}}}if(a){Icon.displayIcon(a)}}}};if(!WH.wowheadRemote){$(document).ready(Icon.checkPound)};

}
/*
     FILE ARCHIVED ON 11:45:54 Jul 10, 2019 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 14:48:58 Sep 11, 2021.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/*
playback timings (ms):
  captures_list: 103.628
  exclusion.robots: 0.161
  exclusion.robots.policy: 0.149
  RedisCDXSource: 1.894
  esindex: 0.013
  LoadShardBlock: 79.837 (3)
  PetaboxLoader3.datanode: 110.546 (4)
  CDXLines.iter: 18.301 (3)
  load_resource: 78.328
  PetaboxLoader3.resolve: 26.19
*/
