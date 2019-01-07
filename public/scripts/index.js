let answer;

$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: '/flashcard',
        success: function (data) {
            console.log(data)
            data.forEach(card => {
                answer=card.answer
                $('.question').html(card.question)
                $('.answer').html(card.answer)
            });
        },
        error: function (err) {
            console.log(err)
        }
    })
    $(".hintButton").click(function () {
        $(".hint").show();
    // $(this).toggleClass("flipped");
    });
   
})


$(".next").click(function(){
    $(".newQuestion").show()

    $.ajax({
        type: 'GET',
        url: '/flashcard',
        success: function (data) {
            console.log(data)
          
           let random = Math.floor(Math.random() * data.length)
           answer=data[random].answer
          $(".question").html(data[random].question)
          $(".answer").hide()
        },
        error: function (err) {
            console.log(err)
        }
    })
})
 $(".answerButton").click(function () {
     $(".answer").show()
        $(".answer").html(answer);
        $(".hint").hide();
        $(".question").show();
    })

