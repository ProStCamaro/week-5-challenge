$(function() {
  // Listener for click events on the save button
  $(".saveBtn").on("click", function() {
    var hourId = $(this).parent().attr("id");
    var description = $(this).siblings(".description").val();
    localStorage.setItem(hourId, description);
  });

  // Apply past, present, or future class to each time block
  var currentHour = dayjs().format("H");
  $(".time-block").each(function() {
    var hourBlock = parseInt($(this).attr("id").split("-")[1]);
    if (hourBlock < currentHour) {
      $(this).addClass("past");
    } else if (hourBlock == currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });

  // Get and set user input from localStorage
  $(".time-block").each(function() {
    var hourId = $(this).attr("id");
    var savedDescription = localStorage.getItem(hourId);
    if (savedDescription !== null) {
      $(this).find(".description").val(savedDescription);
    }
  });

  // Display the current date in the header
  var currentDate = dayjs().format("MMMM DD, YYYY");
  $("#currentDay").text(currentDate);

  // Progress the hour block from 11AM to 5PM
  var currentHourBlock = $("#hour-11");
  var nextHour = 12;
  setInterval(function() {
    currentHourBlock.find(".hour").text(nextHour + "AM");
    currentHourBlock.find(".description").val(localStorage.getItem(currentHourBlock.attr("id")));

    if (nextHour === 5) {
      nextHour = 11;
    } else if (nextHour === 4) {
      nextHour++;
      currentHourBlock.find(".hour").text(nextHour + "PM");
    } else {
      nextHour++;
    }

    currentHourBlock.attr("id", "hour-" + nextHour);
    currentHourBlock = $("#hour-" + nextHour);
  }, 60000); // 60000 milliseconds = 1 minute (change as needed)
});