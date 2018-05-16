### 图片上传预览，过滤文件格式为png/jpeg/jpg/gif，支持拖拽排序

https://sunguangqing.github.io/imgUpload/imgUpload.html

### 图片上传预览插件使用
下载imgUpload.js文件引用到页面中,<script src="js/imgUpload.js"></script>

=== HTML结构：
```
  <div class="imgUpload">
    <ul class="imgBox">
      <li class="imgList"><img src="../images/test-img.png" /> <span class="imgDel"><i></i></span></li>
    </ul>
    <label class="imgFile"><input type="file" multiple maxlength="5" accept="image/gif, image/jpg, image/jpeg, image/png" /></label>
    <p class="fl imgPrompt">共<i></i>张，还能上传<i></i>张</p>
  </div>
```

=== CSS代码:
```
  .imgUpload .imgBox{
      position: relative;
      height: 130px;
      float: left;
  }
  .imgUpload .imgBox .imgList, .imgUpload .imgFile{
      position: relative;
      float: left;
      width: 130px;
      height: 130px;
      margin-right: 12px;
  }
  .imgUpload .imgBox .imgList img{
      width: 100%;
      height: 100%;
      border: 1px dotted #d9d9d9;
  }
  .imgUpload .imgFile{
      background: url(../images/upload-img.png) no-repeat center center;
      background-size: contain;
      cursor: pointer;
  }
  .imgUpload .imgFile input{
      position: absolute;
      opacity: 0;
      width: 100%;
  }
  .imgUpload .imgPrompt{
      line-height: 130px;
      color: #8c8c8c;
  }
  .imgUpload .imgPrompt i{
      color: #f90;
      font-weight: bold;
  }
  .imgBox .imgDel{
      display: none;
      position: absolute;
      width: 27px;
      height: 27px;
      right: 0;
      top: 0;
      left: auto;
      text-align: center;
      background-color: rgba(0,0,0,.5);
      cursor: pointer;
  }
  .imgBox .imgDel i{
      width: 20px;
      height: 20px;
      background: url("../images/shop-sprite.png") no-repeat -323px -10px;
      margin-top: 3.5px;
  }
  .imgUpload .imgBox li:hover .imgDel{
      display: block;
  }
```

=== 图片上传预览 JS代码：
```
  // 图片上传预览
  (function imgUpload() {
      var $fileTag = $(".imgFile input"); //上传文件选择器控件
      $fileTag.each(function () {
          var $fileBox = $(this).parent(),
              maxLen = $(this).prop("maxlength"),  //获取最多上传文件个数
              haveLen = $fileBox.siblings(".imgBox").find(".imgList").length,  //获取已上传文件个数
              needLen = maxLen - haveLen;
          $fileBox.siblings(".imgPrompt").html('<p class="imgPrompt">共<i>' + haveLen + '</i>张，还能上传<i>' + needLen + '</i>张</p>');
      });
      $fileTag.on("change", function () {
          var imgLen = $(this).prop("files").length,
              _html = '',
              $fileBox = $(this).parent(),
              maxLen = $(this).prop("maxlength"),  //获取最多上传文件个数
              haveLen = $fileBox.siblings(".imgBox").find(".imgList").length,  //获取已上传文件个数
              needLen = maxLen - haveLen;
          if((maxLen-haveLen) >= imgLen){
              for(var i = 0; i < imgLen; i++){
                  var imgUrl = getObjectURL(this.files[i]);
                  _html += '<li class="imgList"><img src="'+ imgUrl +'" /> <span class="imgDel"><i></i></span></li>';
              }
              haveLen += imgLen;
              needLen = maxLen - haveLen;
              $fileBox.siblings(".imgBox").append(_html);
              $fileBox.siblings(".imgPrompt").html('<p class="imgPrompt">共<i>' + haveLen + '</i>张，还能上传<i>' + needLen + '</i>张</p>');
          }else {
              $fileBox.siblings(".imgPrompt").html('<p class="imgPrompt">最多上传<i>' + needLen + '</i>张</p>');
          }
          if(maxLen === haveLen){
              $fileBox.hide();
          }
      });
      $(document).on("click", '.imgDel', function () {
          var $imgBox = $(this).parents(".imgBox"),
              haveLen = $imgBox.find(".imgList").length - 1,
              maxLen = $imgBox.siblings(".imgFile").find("input").prop("maxlength"),
              needLen = maxLen - haveLen;
          $(this).parents(".imgBox").siblings(".imgFile").show().siblings(".imgPrompt").html('<p class="imgPrompt">共<i>' + haveLen + '</i>张，还能上传<i>' + needLen + '</i>张</p>');
          $(this).parent().remove();
      });

      //建立一個可存取到該file的url
      function getObjectURL(file)
      {
          var url = null ;
          if (window.createObjectURL!=undefined)
          { // basic
              url = window.createObjectURL(file) ;
          }
          else if (window.URL!=undefined)
          {
              // mozilla(firefox)
              url = window.URL.createObjectURL(file) ;
          }
          else if (window.webkitURL!=undefined) {
              // webkit or chrome
              url = window.webkitURL.createObjectURL(file) ;
          }
          return url ;
      }
  })();
```

=== 图片拖拽排序 JS代码：
“使用拖拽排序需引入 jQueryUI JS文件.”
```
  // 图片上传 排序
  $(".imgBox").sortable({
      cursor: "move",
      opacity: 0.6, //拖动时，透明度为0.6
      revert: true //释放时，增加动画
  });
```
