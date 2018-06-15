$(function () {
    // 图片上传预览
    (function imgUpload() {
        // 图片上传 排序
        $(".imgBox").sortable({
            cursor: "move",
            opacity: 0.6, //拖动时，透明度为0.6
            revert: true //释放时，增加动画
        });

        var $fileTag = $(".imgFile input"); //上传文件选择器控件
        $fileTag.each(function () {
           var $fileBox = $(this).parent(),
               maxLen = $(this).prop("maxlength"),  //获取最多上传文件个数
               haveLen = $fileBox.siblings(".imgBox").find(".imgList").length,  //获取已上传文件个数
               needLen = maxLen - haveLen;
           if(needLen === 0){
               $fileBox.hide();
           }
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
        
        //删除上传的图片
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
});
