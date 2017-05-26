/*
 * Created by https://github.com/YMFL on 2017/5/18.
 */
window.onload=function () {
    $(function(){
        $('#dowebok').fullpage(
            {
                navigation:true,
                scrollingSpeed:700,
                onLeave:function (index,next,dir) {
                    $('.active').removeClass('step'+index);
                },
                afterLoad:function () {
                    $('#dowebok .active').addClass('step'+$('.active').data('id'))
                }
            }
        );
        $(document).on('click','.bg1-footer-down',function () {
            $.fn.fullpage.moveSectionDown();
        })
    });
}