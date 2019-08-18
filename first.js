$( document ).ready(function() {
    $(document).on('click', '.comments__item__text', function () {
        var commentItem = $(this).closest('.comments__item');
        var userName = commentItem.find('.comments__item__user__name > .user_name').html();
        if(userName == 'DELETED') {
            commentItem.css({'position':'relative'});
            var curtain = '<div class="by_curtain" style="position: absolute;top:0;left:0;right:0;bottom: 0;background-color: rgba(0,0,0,0.4);"></div>';
            commentItem.append(curtain);
            var userId = commentItem.data('user_id');
            var commentId = commentItem.data('id');
            var url = 'https://tjapi3.benyazi.ru/spy/check/' + userId + '/' + commentId;
            $.get(url, function (data) {
                console.log(data);
                if(data.success >= 2) {
                    commentItem.find('.comments__item__user__name > .user_name').first().html(data.userName);
                }
                if(data.success == 1 || data.success == 3) {
                    commentItem.find('.comments__item__text > p').first().html(data.comment);
                }
            })
            .always(function() {
                commentItem.find('.by_curtain').remove();
            });
        }
    });
});