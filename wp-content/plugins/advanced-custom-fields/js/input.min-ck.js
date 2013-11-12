/* **********************************************
     Begin acf.js
********************************************** *//*
*  input.js
*
*  All javascript needed for ACF to work
*
*  @type	awesome
*  @date	1/08/13
*
*  @param	N/A
*  @return	N/A
*/var acf={ajaxurl:"",admin_url:"",wp_version:"",post_id:0,nonce:"",l10n:null,o:null,helpers:{get_atts:null,version_compare:null,uniqid:null,sortable:null,add_message:null,is_clone_field:null,url_to_object:null},validation:null,conditional_logic:null,media:null,fields:{date_picker:null,color_picker:null,Image:null,file:null,wysiwyg:null,gallery:null,relationship:null}};(function(e){acf.helpers.isset=function(){var e=arguments,t=e.length,n=0,r;if(t===0)throw new Error("Empty isset");while(n!==t){if(e[n]===r||e[n]===null)return!1;n++}return!0};acf.helpers.get_atts=function(t){var n={};e.each(t[0].attributes,function(e,t){t.name.substr(0,5)=="data-"&&(n[t.name.replace("data-","")]=t.value)});return n};acf.helpers.version_compare=function(e,t){if(typeof e+typeof t!="stringstring")return!1;var n=e.split("."),r=t.split("."),i=0,s=Math.max(n.length,r.length);for(;i<s;i++){if(n[i]&&!r[i]&&parseInt(n[i])>0||parseInt(n[i])>parseInt(r[i]))return 1;if(r[i]&&!n[i]&&parseInt(r[i])>0||parseInt(n[i])<parseInt(r[i]))return-1}return 0};acf.helpers.uniqid=function(){var e=new Date;return e.getTime()};acf.helpers.url_to_object=function(e){var t={},n=e.split("&");for(i in n){var r=n[i].split("=");t[decodeURIComponent(r[0])]=decodeURIComponent(r[1])}return t};acf.helpers.sortable=function(t,n){n.children().each(function(){e(this).width(e(this).width())});return n};acf.helpers.is_clone_field=function(e){return e.attr("name")&&e.attr("name").indexOf("[acfcloneindex]")!=-1?!0:!1};acf.helpers.add_message=function(t,n){var t=e('<div class="acf-message-wrapper"><div class="message updated"><p>'+t+"</p></div></div>");n.prepend(t);setTimeout(function(){t.animate({opacity:0},250,function(){t.remove()})},1500)};e.fn.exists=function(){return e(this).length>0};acf.media={div:null,frame:null,render_timout:null,clear_frame:function(){if(!this.frame)return;this.frame.detach();this.frame.dispose();this.frame=null},type:function(){var e="thickbox";typeof wp=="object"&&(e="backbone");return e},init:function(){var t=wp.media.view.AttachmentCompat.prototype;t.orig_render=t.render;t.orig_dispose=t.dispose;t.className="compat-item acf_postbox no_box";t.render=function(){var t=this;if(t.ignore_render)return this;this.orig_render();setTimeout(function(){var n=t.$el.closest(".media-modal");if(n.hasClass("acf-media-modal"))return;if(n.find(".media-frame-router .acf-expand-details").exists())return;var r=e(['<a href="#" class="acf-expand-details">','<span class="icon"></span>','<span class="is-closed">'+acf.l10n.core.expand_details+"</span>",'<span class="is-open">'+acf.l10n.core.collapse_details+"</span>","</a>"].join(""));r.on("click",function(e){e.preventDefault();n.hasClass("acf-expanded")?n.removeClass("acf-expanded"):n.addClass("acf-expanded")});n.find(".media-frame-router").append(r)},0);clearTimeout(acf.media.render_timout);acf.media.render_timout=setTimeout(function(){e(document).trigger("acf/setup_fields",[t.$el])},50);return this};t.dispose=function(){e(document).trigger("acf/remove_fields",[this.$el]);this.orig_dispose()};t.save=function(e){var t={},n={};e&&e.preventDefault();_.each(this.$el.serializeArray(),function(e){if(e.name.slice(-2)==="[]"){e.name=e.name.replace("[]","");typeof n[e.name]=="undefined"&&(n[e.name]=-1);n[e.name]++;e.name+="["+n[e.name]+"]"}t[e.name]=e.value});this.ignore_render=!0;this.model.saveCompat(t)}}};acf.conditional_logic={items:[],init:function(){var t=this;e(document).on("change",".field input, .field textarea, .field select",function(){e("#acf-has-changed").exists()&&e("#acf-has-changed").val(1);t.change()});e(document).on("acf/setup_fields",function(e,n){t.change()});t.change()},change:function(){var t=this;e.each(this.items,function(n,r){var i=e(".field_key-"+r.field);i.each(function(){var n=!0;r.allorany=="any"&&(n=!1);var i=e(this),s=!0;e.each(r.rules,function(o,u){var a=e(".field_key-"+u.field);if(a.hasClass("sub_field")){a=i.siblings(".field_key-"+u.field);s=!1;if(!a.exists()){i.parents("tr").each(function(){a=e(this).find(".field_key-"+u.field);if(a.exists())return!1});s=!0}}if(i.parent("tr").parent().parent("table").parent(".layout").exists()){s=!0;i.is("th")&&a.is("th")&&(a=i.closest(".layout").find("td.field_key-"+u.field))}var f=t.calculate(u,a,i);if(r.allorany=="all"){if(f==0){n=!1;return!1}}else if(f==1){n=!0;return!1}});i.removeClass("acf-conditional_logic-hide acf-conditional_logic-show acf-show-blank");if(n){i.find("input, textarea, select").removeAttr("disabled");i.addClass("acf-conditional_logic-show");e(document).trigger("acf/conditional_logic/show",[i,r])}else{i.find("input, textarea, select").attr("disabled","disabled");i.addClass("acf-conditional_logic-hide");s||i.addClass("acf-show-blank");e(document).trigger("acf/conditional_logic/hide",[i,r])}})})},calculate:function(t,n,r){var i=!1;if(n.hasClass("field_type-true_false")||n.hasClass("field_type-checkbox")||n.hasClass("field_type-radio")){var s=n.find('input[value="'+t.value+'"]:checked').exists();t.operator=="=="?s&&(i=!0):s||(i=!0)}else{var o=n.find("input, textarea, select").last().val();e.isArray(o)||(o=[o]);t.operator=="=="?e.inArray(t.value,o)>-1&&(i=!0):e.inArray(t.value,o)<0&&(i=!0)}return i}};e(document).ready(function(){acf.conditional_logic.init();e(".acf_postbox > .inside > .options").each(function(){e(this).closest(".acf_postbox").addClass(e(this).attr("data-layout"))});e('#metakeyselect option[value^="field_"]').remove()});e(window).load(function(){acf.media.init();setTimeout(function(){try{e.isNumeric(acf.o.post_id)&&(wp.media.view.settings.post.id=acf.o.post_id)}catch(t){}e(document).trigger("acf/setup_fields",[e("#poststuff")])},10)});acf.fields.gallery={add:function(){},edit:function(){},update_count:function(){},hide_selected_items:function(){},text:{title_add:"Select Images"}}})(jQuery);(function(e){acf.screen={action:"acf/location/match_field_groups_ajax",post_id:0,page_template:0,page_parent:0,page_type:0,post_category:0,post_format:0,taxonomy:0,lang:0,nonce:0};e(document).ready(function(){acf.screen.post_id=acf.o.post_id;acf.screen.nonce=acf.o.nonce;if(e("#icl-als-first").length>0){var t=e("#icl-als-first").children("a").attr("href"),n=new RegExp("lang=([^&#]*)"),r=n.exec(t);acf.screen.lang=r[1]}});e(document).on("acf/update_field_groups",function(){if(!acf.screen.post_id||!e.isNumeric(acf.screen.post_id))return!1;e.ajax({url:ajaxurl,data:acf.screen,type:"post",dataType:"json",success:function(t){if(!t)return!1;e(".acf_postbox").addClass("acf-hidden");e(".acf_postbox-toggle").addClass("acf-hidden");if(t.length==0)return!1;e.each(t,function(t,n){var r=e("#acf_"+n),i=e('#adv-settings .acf_postbox-toggle[for="acf_'+n+'-hide"]');r.removeClass("acf-hidden hide-if-js");i.removeClass("acf-hidden");i.find('input[type="checkbox"]').attr("checked","checked");r.find(".acf-replace-with-fields").each(function(){var t=e(this);e.ajax({url:ajaxurl,data:{action:"acf/post/render_fields",acf_id:n,post_id:acf.o.post_id,nonce:acf.o.nonce},type:"post",dataType:"html",success:function(n){t.replaceWith(n);e(document).trigger("acf/setup_fields",r)}})})});e.ajax({url:ajaxurl,data:{action:"acf/post/get_style",acf_id:t[0],nonce:acf.o.nonce},type:"post",dataType:"html",success:function(t){e("#acf_style").html(t)}})}})});e(document).on("change","#page_template",function(){acf.screen.page_template=e(this).val();e(document).trigger("acf/update_field_groups")});e(document).on("change","#parent_id",function(){var t=e(this).val();if(t!=""){acf.screen.page_type="child";acf.screen.page_parent=t}else{acf.screen.page_type="parent";acf.screen.page_parent=0}e(document).trigger("acf/update_field_groups")});e(document).on("change",'#post-formats-select input[type="radio"]',function(){var t=e(this).val();t=="0"&&(t="standard");acf.screen.post_format=t;e(document).trigger("acf/update_field_groups")});e(document).on("change",'.categorychecklist input[type="checkbox"]',function(){if(e(this).closest(".categorychecklist").hasClass("no-ajax"))return;setTimeout(function(){var t=[];e('.categorychecklist input[type="checkbox"]:checked').each(function(){if(e(this).is(":hidden")||e(this).is(":disabled"))return;t.push(e(this).val())});acf.screen.post_category=t;acf.screen.taxonomy=t;e(document).trigger("acf/update_field_groups")},1)})})(jQuery);(function(e){var t=acf.fields.color_picker={$el:null,$input:null,set:function(t){e.extend(this,t);this.$input=this.$el.find('input[type="text"]');return this},init:function(){if(acf.helpers.is_clone_field(this.$input))return;this.$input.wpColorPicker()}};e(document).on("acf/setup_fields",function(n,r){e(r).find(".acf-color_picker").each(function(){t.set({$el:e(this)}).init()})})})(jQuery);(function(e){acf.fields.date_picker={$el:null,$input:null,$hidden:null,o:{},set:function(t){e.extend(this,t);this.$input=this.$el.find('input[type="text"]');this.$hidden=this.$el.find('input[type="hidden"]');this.o=acf.helpers.get_atts(this.$el);return this},init:function(){if(acf.helpers.is_clone_field(this.$hidden))return;this.$input.val(this.$hidden.val());var t=e.extend({},acf.l10n.date_picker,{dateFormat:this.o.save_format,altField:this.$hidden,altFormat:this.o.save_format,changeYear:!0,yearRange:"-100:+100",changeMonth:!0,showButtonPanel:!0,firstDay:this.o.first_day});this.$input.addClass("active").datepicker(t);this.$input.datepicker("option","dateFormat",this.o.display_format);e("body > #ui-datepicker-div").length>0&&e("#ui-datepicker-div").wrap('<div class="ui-acf" />')},blur:function(){this.$input.val()||this.$hidden.val("")}};e(document).on("acf/setup_fields",function(t,n){e(n).find(".acf-date_picker").each(function(){acf.fields.date_picker.set({$el:e(this)}).init()})});e(document).on("blur",'.acf-date_picker input[type="text"]',function(t){acf.fields.date_picker.set({$el:e(this).parent()}).blur()})})(jQuery);(function(e){var t=acf.media;acf.fields.file={$el:null,$input:null,o:{},set:function(t){e.extend(this,t);this.$input=this.$el.find('input[type="hidden"]');this.o=acf.helpers.get_atts(this.$el);this.o.multiple=this.$el.closest(".repeater").exists()?!0:!1;this.o.query={};this.o.library=="uploadedTo"&&(this.o.query.uploadedTo=acf.o.post_id);return this},init:function(){if(acf.helpers.is_clone_field(this.$input))return},add:function(e){var n=t.div;n.find(".acf-file-icon").attr("src",e.icon);n.find(".acf-file-title").text(e.title);n.find(".acf-file-name").text(e.name).attr("href",e.url);n.find(".acf-file-size").text(e.size);n.find(".acf-file-value").val(e.id).trigger("change");n.addClass("active");n.closest(".field").removeClass("error")},edit:function(){var n=this.$input.val();t.div=this.$el;t.clear_frame();t.frame=wp.media({title:acf.l10n.file.edit,multiple:!1,button:{text:acf.l10n.file.update}});t.frame.on("open",function(){t.frame.content._mode!="browse"&&t.frame.content.mode("browse");t.frame.$el.closest(".media-modal").addClass("acf-media-modal acf-expanded");var r=t.frame.state().get("selection"),i=wp.media.attachment(n);e.isEmptyObject(i.changed)&&i.fetch();r.add(i)});t.frame.on("close",function(){t.frame.$el.closest(".media-modal").removeClass("acf-media-modal")});acf.media.frame.open()},remove:function(){this.$el.find(".acf-file-icon").attr("src","");this.$el.find(".acf-file-title").text("");this.$el.find(".acf-file-name").text("").attr("href","");this.$el.find(".acf-file-size").text("");this.$el.find(".acf-file-value").val("").trigger("change");this.$el.removeClass("active")},popup:function(){var n=this;t.div=this.$el;t.clear_frame();t.frame=wp.media({states:[new wp.media.controller.Library({library:wp.media.query(n.o.query),multiple:n.o.multiple,title:acf.l10n.file.select,priority:20,filterable:"all"})]});acf.media.frame.on("content:activate",function(){var t=null,r=null;try{t=acf.media.frame.content.get().toolbar;r=t.get("filters")}catch(i){}if(!r)return!1;if(n.o.library=="uploadedTo"){r.$el.find('option[value="uploaded"]').remove();r.$el.after("<span>"+acf.l10n.file.uploadedTo+"</span>");e.each(r.filters,function(e,t){t.props.uploadedTo=acf.o.post_id})}});acf.media.frame.on("select",function(){selection=t.frame.state().get("selection");if(selection){var e=0;selection.each(function(n){e++;if(e>1){var r=t.div.closest("td"),i=r.closest(".row"),s=i.closest(".repeater"),o=r.attr("data-field_key"),u="td .acf-file-uploader:first";o&&(u='td[data-field_key="'+o+'"] .acf-file-uploader');i.next(".row").exists()||s.find(".add-row-end").trigger("click");t.div=i.next(".row").find(u)}var a={id:n.id,title:n.attributes.title,name:n.attributes.filename,url:n.attributes.url,icon:n.attributes.icon,size:n.attributes.filesize};acf.fields.file.add(a)})}});acf.media.frame.open();return!1}};e(document).on("click",".acf-file-uploader .acf-button-edit",function(t){t.preventDefault();acf.fields.file.set({$el:e(this).closest(".acf-file-uploader")}).edit()});e(document).on("click",".acf-file-uploader .acf-button-delete",function(t){t.preventDefault();acf.fields.file.set({$el:e(this).closest(".acf-file-uploader")}).remove()});e(document).on("click",".acf-file-uploader .add-file",function(t){t.preventDefault();acf.fields.file.set({$el:e(this).closest(".acf-file-uploader")}).popup()})})(jQuery);(function(e){acf.fields.location={$el:null,$input:null,o:{},geocoder:!1,map:!1,maps:{},set:function(t){e.extend(this,t);this.$input=this.$el.find(".value");this.o=acf.helpers.get_atts(this.$el);this.maps[this.o.id]&&(this.map=this.maps[this.o.id]);this.geocoder=new google.maps.Geocoder;return this},init:function(){if(acf.helpers.is_clone_field(this.$input))return;this.render()},render:function(){var e=this,t=this.$el,n={zoom:14,center:new google.maps.LatLng(this.o.lat,this.o.lng),mapTypeId:google.maps.MapTypeId.ROADMAP};this.map=new google.maps.Map(this.$el.find(".canvas")[0],n);var r=new google.maps.places.Autocomplete(this.$el.find(".search")[0]);r.map=this.map;r.bindTo("bounds",this.map);this.map.marker=new google.maps.Marker({draggable:!0,raiseOnDrag:!0,map:this.map});this.map.$el=this.$el;var i=this.$el.find(".input-lat").val(),s=this.$el.find(".input-lng").val();i&&s&&this.update(i,s).center();google.maps.event.addListener(r,"place_changed",function(t){var n=this.map.$el,r=n.find(".search").val();n.find(".input-address").val(r);n.find(".title h4").text(r);var i=this.getPlace();if(i.geometry){var s=i.geometry.location.lat(),o=i.geometry.location.lng();e.set({$el:n}).update(s,o).center()}else e.geocoder.geocode({address:r},function(t,r){if(r!=google.maps.GeocoderStatus.OK){console.log("Geocoder failed due to: "+r);return}if(!t[0]){console.log("No results found");return}i=t[0];var s=i.geometry.location.lat(),o=i.geometry.location.lng();e.set({$el:n}).update(s,o).center()})});google.maps.event.addListener(this.map.marker,"dragend",function(){var t=this.map.$el,n=this.map.marker.getPosition(),r=n.lat(),i=n.lng();e.set({$el:t}).update(r,i).sync()});google.maps.event.addListener(this.map,"click",function(t){var n=this.$el,r=t.latLng.lat(),i=t.latLng.lng();e.set({$el:n}).update(r,i).sync()});this.maps[this.o.id]=this.map},update:function(e,t){var n=new google.maps.LatLng(e,t);this.$el.find(".input-lat").val(e);this.$el.find(".input-lng").val(t).trigger("change");this.map.marker.setPosition(n);this.map.marker.setVisible(!0);this.$el.addClass("active");this.$el.closest(".field").removeClass("error");return this},center:function(){var e=this.map.marker.getPosition(),t=new google.maps.LatLng(e.lat(),e.lng());this.map.setCenter(t)},sync:function(){var e=this.$el,t=this.map.marker.getPosition(),n=new google.maps.LatLng(t.lat(),t.lng());this.geocoder.geocode({latLng:n},function(t,n){if(n!=google.maps.GeocoderStatus.OK){console.log("Geocoder failed due to: "+n);return}if(!t[0]){console.log("No results found");return}var r=t[0];e.find(".title h4").text(r.formatted_address);e.find(".input-address").val(r.formatted_address).trigger("change")});return this},locate:function(){var e=this,t=this.$el;if(!navigator.geolocation){alert(acf.l10n.google_map.browser_support);return this}t.find(".title h4").text(acf.l10n.google_map.locating+"...");t.addClass("active");navigator.geolocation.getCurrentPosition(function(n){var r=n.coords.latitude,i=n.coords.longitude;e.set({$el:t}).update(r,i).sync().center()})},clear:function(){this.$el.removeClass("active");this.$el.find(".search").val("");this.$el.find(".input-address").val("");this.$el.find(".input-lat").val("");this.$el.find(".input-lng").val("");this.map.marker.setVisible(!1)},edit:function(){this.$el.removeClass("active");var e=this.$el.find(".title h4").text();this.$el.find(".search").val(e).focus()}};e(document).on("acf/setup_fields",function(t,n){e(n).find(".acf-google-map").exists()&&(typeof google=="undefined"?e.getScript("https://www.google.com/jsapi",function(){google.load("maps","3",{other_params:"sensor=false&libraries=places",callback:function(){e(n).find(".acf-google-map").each(function(){acf.fields.location.set({$el:e(this)}).init()})}})}):e(n).find(".acf-google-map").each(function(){acf.fields.location.set({$el:e(this)}).init()}))});e(document).on("click",".acf-google-map .acf-sprite-remove",function(t){t.preventDefault();acf.fields.location.set({$el:e(this).closest(".acf-google-map")}).clear();e(this).blur()});e(document).on("click",".acf-google-map .acf-sprite-locate",function(t){t.preventDefault();acf.fields.location.set({$el:e(this).closest(".acf-google-map")}).locate();e(this).blur()});e(document).on("click",".acf-google-map .title h4",function(t){t.preventDefault();acf.fields.location.set({$el:e(this).closest(".acf-google-map")}).edit()});e(document).on("keydown",".acf-google-map .search",function(e){if(e.which==13)return!1});e(document).on("blur",".acf-google-map .search",function(t){var n=e(this).closest(".acf-google-map");n.find(".input-lat").val()&&n.addClass("active")})})(jQuery);(function(e){var t=acf.media;acf.fields.image={$el:null,$input:null,o:{},set:function(t){e.extend(this,t);this.$input=this.$el.find('input[type="hidden"]');this.o=acf.helpers.get_atts(this.$el);this.o.multiple=this.$el.closest(".repeater").exists()?!0:!1;this.o.query={type:"image"};this.o.library=="uploadedTo"&&(this.o.query.uploadedTo=acf.o.post_id);return this},init:function(){if(acf.helpers.is_clone_field(this.$input))return},add:function(e){var n=t.div;n.find(".acf-image-image").attr("src",e.url);n.find(".acf-image-value").val(e.id).trigger("change");n.addClass("active");n.closest(".field").removeClass("error")},edit:function(){var n=this.$input.val();t.div=this.$el;t.clear_frame();t.frame=wp.media({title:acf.l10n.image.edit,multiple:!1,button:{text:acf.l10n.image.update}});t.frame.on("open",function(){t.frame.content._mode!="browse"&&t.frame.content.mode("browse");t.frame.$el.closest(".media-modal").addClass("acf-media-modal acf-expanded");var r=t.frame.state().get("selection"),i=wp.media.attachment(n);e.isEmptyObject(i.changed)&&i.fetch();r.add(i)});t.frame.on("close",function(){t.frame.$el.closest(".media-modal").removeClass("acf-media-modal")});acf.media.frame.open()},remove:function(){this.$el.find(".acf-image-image").attr("src","");this.$el.find(".acf-image-value").val("").trigger("change");this.$el.removeClass("active")},popup:function(){var n=this;t.div=this.$el;t.clear_frame();t.frame=wp.media({states:[new wp.media.controller.Library({library:wp.media.query(n.o.query),multiple:n.o.multiple,title:acf.l10n.image.select,priority:20,filterable:"all"})]});acf.media.frame.on("content:activate",function(){var t=null,r=null;try{t=acf.media.frame.content.get().toolbar;r=t.get("filters")}catch(i){}if(!r)return!1;e.each(r.filters,function(e,t){t.props.type="image"});if(n.o.library=="uploadedTo"){r.$el.find('option[value="uploaded"]').remove();r.$el.after("<span>"+acf.l10n.image.uploadedTo+"</span>");e.each(r.filters,function(e,t){t.props.uploadedTo=acf.o.post_id})}r.$el.find("option").each(function(){var t=e(this).attr("value");if(t=="uploaded"&&n.o.library=="all")return;t.indexOf("image")===-1&&e(this).remove()});r.$el.val("image").trigger("change")});acf.media.frame.on("select",function(){selection=t.frame.state().get("selection");if(selection){var e=0;selection.each(function(r){e++;if(e>1){var i=t.div.closest("td"),s=i.closest(".row"),o=s.closest(".repeater"),u=i.attr("data-field_key"),a="td .acf-image-uploader:first";u&&(a='td[data-field_key="'+u+'"] .acf-image-uploader');s.next(".row").exists()||o.find(".add-row-end").trigger("click");t.div=s.next(".row").find(a)}var f={id:r.id,url:r.attributes.url};r.attributes.sizes&&r.attributes.sizes[n.o.preview_size]&&(f.url=r.attributes.sizes[n.o.preview_size].url);acf.fields.image.add(f)})}});acf.media.frame.open();return!1},text:{title_add:"Select Image",title_edit:"Edit Image"}};e(document).on("click",".acf-image-uploader .acf-button-edit",function(t){t.preventDefault();acf.fields.image.set({$el:e(this).closest(".acf-image-uploader")}).edit()});e(document).on("click",".acf-image-uploader .acf-button-delete",function(t){t.preventDefault();acf.fields.image.set({$el:e(this).closest(".acf-image-uploader")}).remove()});e(document).on("click",".acf-image-uploader .add-image",function(t){t.preventDefault();acf.fields.image.set({$el:e(this).closest(".acf-image-uploader")}).popup()})})(jQuery);(function(e){acf.fields.radio={$el:null,$input:null,$other:null,farbtastic:null,set:function(t){e.extend(this,t);this.$input=this.$el.find('input[type="radio"]:checked');this.$other=this.$el.find('input[type="text"]');return this},change:function(){if(this.$input.val()=="other"){this.$other.attr("name",this.$input.attr("name"));this.$other.show()}else{this.$other.attr("name","");this.$other.hide()}}};e(document).on("change",'.acf-radio-list input[type="radio"]',function(t){acf.fields.radio.set({$el:e(this).closest(".acf-radio-list")}).change()})})(jQuery);(function(e){acf.fields.relationship={$el:null,$input:null,$left:null,$right:null,o:{},timeout:null,set:function(t){e.extend(this,t);this.$input=this.$el.children('input[type="hidden"]');this.$left=this.$el.find(".relationship_left"),this.$right=this.$el.find(".relationship_right");this.o=acf.helpers.get_atts(this.$el);return this},init:function(){var t=this;if(acf.helpers.is_clone_field(this.$input))return;this.$right.find(".relationship_list").height(this.$left.height()-2);this.$right.find(".relationship_list").sortable({axis:"y",items:"> li",forceHelperSize:!0,forcePlaceholderSize:!0,scroll:!0,update:function(){t.$input.trigger("change")}});var n=this.$el;this.$left.find(".relationship_list").scrollTop(0).on("scroll",function(r){if(n.hasClass("loading")||n.hasClass("no-results"))return;if(e(this).scrollTop()+e(this).innerHeight()>=e(this).get(0).scrollHeight){var i=parseInt(n.attr("data-paged"));n.attr("data-paged",i+1);t.set({$el:n}).fetch()}});this.fetch()},fetch:function(){var t=this,n=this.$el;n.addClass("loading");e.ajax({url:acf.o.ajaxurl,type:"post",dataType:"json",data:e.extend({action:"acf/fields/relationship/query_posts",post_id:acf.o.post_id,nonce:acf.o.nonce},this.o),success:function(e){t.set({$el:n}).render(e)}})},render:function(t){var n=this;this.$el.removeClass("no-results").removeClass("loading");this.o.paged==1&&this.$el.find(".relationship_left li:not(.load-more)").remove();if(!t||!t.html){this.$el.addClass("no-results");return}this.$el.find(".relationship_left .load-more").before(t.html);t.next_page_exists||this.$el.addClass("no-results");this.$left.find("a").each(function(){var t=e(this).attr("data-post_id");n.$right.find('a[data-post_id="'+t+'"]').exists()&&e(this).parent().addClass("hide")})},add:function(e){var t=e.attr("data-post_id"),n=e.html();if(this.$right.find("a").length>=this.o.max){alert(acf.l10n.relationship.max.replace("{max}",this.o.max));return!1}if(e.parent().hasClass("hide"))return!1;e.parent().addClass("hide");var r={post_id:e.attr("data-post_id"),title:e.html(),name:this.$input.attr("name")},i=_.template(acf.l10n.relationship.tmpl_li,r);this.$right.find(".relationship_list").append(i);this.$input.trigger("change");this.$el.closest(".field").removeClass("error")},remove:function(e){e.parent().remove();this.$left.find('a[data-post_id="'+e.attr("data-post_id")+'"]').parent("li").removeClass("hide");this.$input.trigger("change")}};e(document).on("acf/setup_fields",function(t,n){e(n).find(".acf_relationship").each(function(){acf.fields.relationship.set({$el:e(this)}).init()})});e(document).on("change",".acf_relationship .select-post_type",function(t){var n=e(this).val(),r=e(this).closest(".acf_relationship");r.attr("data-post_type",n);r.attr("data-paged",1);acf.fields.relationship.set({$el:r}).fetch()});e(document).on("click",".acf_relationship .relationship_left .relationship_list a",function(t){t.preventDefault();acf.fields.relationship.set({$el:e(this).closest(".acf_relationship")}).add(e(this));e(this).blur()});e(document).on("click",".acf_relationship .relationship_right .relationship_list a",function(t){t.preventDefault();acf.fields.relationship.set({$el:e(this).closest(".acf_relationship")}).remove(e(this));e(this).blur()});e(document).on("keyup",".acf_relationship input.relationship_search",function(t){var n=e(this).val(),r=e(this).closest(".acf_relationship");r.attr("data-s",n);r.attr("data-paged",1);clearTimeout(acf.fields.relationship.timeout);acf.fields.relationship.timeout=setTimeout(function(){acf.fields.relationship.set({$el:r}).fetch()},500)});e(document).on("keypress",".acf_relationship input.relationship_search",function(e){e.which==13&&e.preventDefault()})})(jQuery);(function(e){e(document).on("acf/setup_fields",function(t,n){if(!e(n).find(".acf-tab").exists())return;e(n).find(".acf-tab").each(function(){var t=e(this),n=t.parent(),r=n.parent(),i=t.attr("data-id"),s=t.html();if(t.hasClass("acf-tab-added"))return;t.addClass("acf-tab-added");r.children(".acf-tab-group").exists()||r.children(".field_type-tab:first").before('<ul class="hl clearfix acf-tab-group"></ul>');r.children(".acf-tab-group").append('<li class="field_key-'+i+'" data-field_key="'+i+'"><a class="acf-tab-button" href="#" data-id="'+i+'">'+s+"</a></li>")});e(n).find(".acf-tab-group").each(function(){e(this).find("li:first a").trigger("click")});acf.conditional_logic.change()});e(document).on("click",".acf-tab-button",function(t){t.preventDefault();var n=e(this),r=n.closest("ul"),i=r.parent(),s=n.attr("data-id");r.find("li").removeClass("active");n.parent("li").addClass("active");i.children(".field_type-tab").each(function(){var t=e(this);t.hasClass("field_key-"+s)?t.nextUntil(".field_type-tab").removeClass("acf-tab_group-hide").addClass("acf-tab_group-show"):t.nextUntil(".field_type-tab").removeClass("acf-tab_group-show").addClass("acf-tab_group-hide")});n.trigger("blur")});e(document).on("acf/conditional_logic/hide",function(t,n,r){if(!n.parent().hasClass("acf-tab-group"))return;var i=n.attr("data-field_key");n.siblings(":visible").exists()?n.siblings(":visible").first().children("a").trigger("click"):e('.field_type-tab[data-field_key="'+i+'"]').nextUntil(".field_type-tab").removeClass("acf-tab_group-show").addClass("acf-tab_group-hide")});e(document).on("acf/conditional_logic/show",function(e,t,n){if(!t.parent().hasClass("acf-tab-group"))return;if(t.hasClass("active")){t.children("a").trigger("click");return}if(t.siblings(".active").hasClass("acf-conditional_logic-hide")){t.children("a").trigger("click");return}})})(jQuery);(function(e){acf.validation={status:!0,disabled:!1,run:function(){var t=this;t.status=!0;e(".field.required, .form-field.required").each(function(){t.validate(e(this))})},validate:function(t){t.data("validation",!0);if(t.is(":hidden"))return;if(t.hasClass("acf-conditional_logic-hide"))return;if(t.hasClass("acf-tab_group-hide")&&t.prevAll(".field_type-tab:first").hasClass("acf-conditional_logic-hide"))return;t.find('input[type="text"], input[type="email"], input[type="number"], input[type="hidden"], textarea').val()==""&&t.data("validation",!1);if(t.find(".acf_wysiwyg").exists()&&typeof tinyMCE=="object"){t.data("validation",!0);var n=t.find(".wp-editor-area").attr("id"),r=tinyMCE.get(n);r&&!r.getContent()&&t.data("validation",!1)}if(t.find("select").exists()){t.data("validation",!0);(t.find("select").val()=="null"||!t.find("select").val())&&t.data("validation",!1)}if(t.find('input[type="radio"]').exists()){t.data("validation",!1);t.find('input[type="radio"]:checked').exists()&&t.data("validation",!0)}if(t.find('input[type="checkbox"]').exists()){t.data("validation",!1);t.find('input[type="checkbox"]:checked').exists()&&t.data("validation",!0)}if(t.find(".acf_relationship").exists()){t.data("validation",!1);t.find(".acf_relationship .relationship_right input").exists()&&t.data("validation",!0)}if(t.find(".repeater").exists()){t.data("validation",!1);t.find(".repeater tr.row").exists()&&t.data("validation",!0)}if(t.find(".acf-gallery").exists()){t.data("validation",!1);t.find(".acf-gallery .thumbnail").exists()&&t.data("validation",!0)}e(document).trigger("acf/validate_field",[t]);if(!t.data("validation")){this.status=!1;t.closest(".field").addClass("error");if(t.data("validation_message")){var i=t.find("p.label:first"),s=null;i.children(".acf-error-message").remove();i.append('<span class="acf-error-message"><i class="bit"></i>'+t.data("validation_message")+"</span>")}}}};e(document).on("focus click",".field.required input, .field.required textarea, .field.required select",function(t){e(this).closest(".field").removeClass("error")});e(document).on("click","#save-post",function(){acf.validation.disabled=!0});e(document).on("submit","#post",function(){if(acf.validation.disabled)return!0;acf.validation.run();if(!acf.validation.status){var t=e(this);t.siblings("#message").remove();t.before('<div id="message" class="error"><p>'+acf.l10n.validation.error+"</p></div>");e("#publish").removeClass("button-primary-disabled");e("#ajax-loading").attr("style","");e("#publishing-action .spinner").hide();return!1}e(".acf_postbox.acf-hidden").remove();return!0})})(jQuery);(function(e){var t=acf.fields.wysiwyg={$el:null,$textarea:null,o:{},set:function(t){e.extend(this,t);this.$textarea=this.$el.find("textarea");this.o=acf.helpers.get_atts(this.$el);this.o.id=this.$textarea.attr("id");return this},has_tinymce:function(){var e=!1;typeof tinyMCE=="object"&&(e=!0);return e},init:function(){if(acf.helpers.is_clone_field(this.$textarea))return;var t=e.extend({},tinyMCE.settings);tinyMCE.settings.theme_advanced_buttons1="";tinyMCE.settings.theme_advanced_buttons2="";tinyMCE.settings.theme_advanced_buttons3="";tinyMCE.settings.theme_advanced_buttons4="";acf.helpers.isset(this.toolbars[this.o.toolbar])&&e.each(this.toolbars[this.o.toolbar],function(e,t){tinyMCE.settings[e]=t});tinyMCE.execCommand("mceAddControl",!1,this.o.id);e(document).trigger("acf/wysiwyg/load",this.o.id);this.add_events();tinyMCE.settings=t;wpActiveEditor=null},add_events:function(){var t=this.o.id,n=tinyMCE.get(t);if(!n)return;var r=e("#wp-"+t+"-wrap"),i=e(n.getBody());r.on("click",function(){e(document).trigger("acf/wysiwyg/click",t)});i.on("focus",function(){e(document).trigger("acf/wysiwyg/focus",t)});i.on("blur",function(){e(document).trigger("acf/wysiwyg/blur",t)})},destroy:function(){try{var e=this.o.id,t=tinyMCE.get(e);if(t){var n=t.getContent();tinyMCE.execCommand("mceRemoveControl",!1,e);this.$textarea.val(n)}}catch(r){}wpActiveEditor=null}};e(document).on("acf/setup_fields",function(n,r){if(!t.has_tinymce())return;e(r).find(".acf_wysiwyg").each(function(){t.set({$el:e(this)}).destroy()});setTimeout(function(){e(r).find(".acf_wysiwyg").each(function(){t.set({$el:e(this)}).init()})},0)});e(document).on("acf/remove_fields",function(n,r){if(!t.has_tinymce())return;r.find(".acf_wysiwyg").each(function(){t.set({$el:e(this)}).destroy()})});e(document).on("acf/wysiwyg/click",function(t,n){wpActiveEditor=n;container=e("#wp-"+n+"-wrap").closest(".field").removeClass("error")});e(document).on("acf/wysiwyg/focus",function(t,n){wpActiveEditor=n;container=e("#wp-"+n+"-wrap").closest(".field").removeClass("error")});e(document).on("acf/wysiwyg/blur",function(t,n){wpActiveEditor=null;var r=tinyMCE.get(n);if(!r)return;var i=r.getElement();r.save();e(i).trigger("change")});e(document).on("acf/sortable_start",function(n,r){if(!t.has_tinymce())return;e(r).find(".acf_wysiwyg").each(function(){t.set({$el:e(this)}).destroy()})});e(document).on("acf/sortable_stop",function(n,r){if(!t.has_tinymce())return;e(r).find(".acf_wysiwyg").each(function(){t.set({$el:e(this)}).init()})});e(window).load(function(){if(!t.has_tinymce())return;var n=e("#wp-content-wrap").exists(),r=e("#wp-acf_settings-wrap").exists();mode="tmce";r&&e("#wp-acf_settings-wrap").hasClass("html-active")&&
(mode="html");setTimeout(function(){r&&mode=="html"&&e("#acf_settings-tmce").trigger("click")},1);setTimeout(function(){r&&mode=="html"&&e("#acf_settings-html").trigger("click");n&&t.set({$el:e("#wp-content-wrap")}).add_events()},11)});e(document).on("click",".acf_wysiwyg a.mce_fullscreen",function(){var t=e(this).closest(".acf_wysiwyg"),n=t.attr("data-upload");n=="no"&&e("#mce_fullscreen_container td.mceToolbar .mce_add_media").remove()})})(jQuery);