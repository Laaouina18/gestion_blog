function check(){
    if($('.iconbar>div').hasClass('active')){
      $(".iconbar>.icons:nth-of-type(1)").css({'background-color':'#D9E9EF', 'color':'#11313F'});
      $(".iconbar>.icons:nth-of-type(2)").css({'background-color':'#DFDDF7','color':'#4D4B6A'});
      $(".iconbar>.icons:nth-of-type(3)").css({'background-color':'#DDF3CF','color':'#47553E'});
      $(".iconbar>.icons:nth-of-type(4)").css({'background-color':'#D9DBFA','color':'#303E3F'});
      
      $('.iconbar>div:not(.active)').css({'background-color':'transparent', 'color':'black'});
    }
  };
  
  $(".icons").click(function(){
    $(this).addClass("active");
    $(".icons").not(this).removeClass("active");
    check();
    $(".icons>span").hide(400);
    $("> span",this).show(400);
  });


  document.addEventListener("DOMContentLoaded", function() {
    const dropdownBtn = document.getElementById("dropdown-btn");
    const editButtons = document.querySelectorAll(".edit-button");
    const deleteButtons = document.querySelectorAll(".delete-button");

    dropdownBtn.addEventListener("click", function() {
        editButtons.forEach(button => {
            button.classList.toggle("hide-button");
        });
        deleteButtons.forEach(button => {
            button.classList.toggle("hide-button");
        });
    });
});