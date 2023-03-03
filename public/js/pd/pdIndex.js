// When a card is clicked
$('.card-link').click(function(e) {
  // Update content in the description div
  var data = '';
  $('#description > p').removeClass('description-default')
  switch (e.target.innerText) {
    case 'Teachers':
      data =  "<p>I offer a wide variety of differentiated workshops and presentations to help teachers incorporate educational technology " +
              "into their classroom practice. Workshops are designed for groups of 10-15 participants and follow the 'I do/We do' model " +
              "of learning, with the majority of the time devoted to hands-on learning. The presentations are for larger audiences and focus " +
              "on giving ideas and starting points for participants to explore.</p>" +
              "<p>All workshops and sessions are custom created for <span class='text-strong'>your</span> teachers. Some possible topics include:</p>" +
              "<ul>" +
                "<li>Blended Learning</li>" +
                "<li>Using a Learning Management System (e.g. Google Classroom, Schoology, etc.)</li>" +
                "<li>Project- or Problem-Based Learning</li>" +
                "<li>Classroom Management in a 1:1 Environment</li>" +
                "<li>Google Certified Educator Prep</li>" +
                "<li>Digital Tools for Deep Text Analysis</li>" +
                "<li>Creating Instructional Videos</li>" +
                "<li>Or another topic specific to your needs</li>" +
              "</ul>" +
              "<p>Contact me at the email address below to start the conversation!</p>";
      break;
    case 'Leaders':
      data = "<p>As a former instructional coordinator, I know first hand that effective leadership facilitates student growth. " +
              "Leader training is for small groups of leaders such as school- and district-level administrators, coordinating teachers, " +
              "technology/STEM coaches, and other instructional leaders. These training sessions focus on helping leaders provide ongoing " +
              "support for teachers in a 21st-century classroom.</p>" +
              "<p>All sessions are custom created for <span class='text-strong'>your</span> leaders. Some possible topics include:</p>" +
              "<ul>" +
                "<li>The Coaching Cycle</li>" +
                "<li>The T-PACK Model</li>" +
                "<li>Design Thinking</li>" +
                "<li>Building Capacity</li>" +
                "<li>Digital Tools to Facilitate Stakeholder Communication</li>" +
                "<li>Blended Learning</li>" +
                "<li>G-Suite Administration Best Practices (for IT leaders)</li>" +
                "<li>Or another topic specific to your needs</li>" +
              "</ul>" +
              "<p>Contact me at the email address below to start the conversation!</p>";
      break;
    case 'Boot Camp':
      data = "<p>Boot camps are intensive, multi-day workshops for small groups of committed educators. Boot camps are for both teachers and " +
              "leaders who will be working together to create learning experiences that can be immediately implemented with their students. " +
              "Outcomes for boot camps include full learning unit(s), including lesson plans and formative/summative assessments, that incorporate " +
              "innovative teaching strategies.</p>" +
              "<p>All boot camps are custom created for <span class='text-strong'>your</span> trailblazers. Some possible teaching strategies include:</p>" +
              "<ul>" +
                "<li>Cross-Curricular Planning and Teaching</li>" +
                "<li>Game-Based Learning/Alternate-Reality Games</li>" +
                "<li>Incorporating Coding Throughout the Curriculum</li>" +
                "<li>Or other strategies specific to your needs</li>" +
              "</ul>" +
              "<p>Boot camps are highly collaborative and will be widely different for each group that participates.</p>" +
              "<p>Contact me at the email address below to start the conversation!</p>";
      break;
  }
  $('#description > p').html(data);
  // $('#description > p');

  // Highlight the selected card and fade out the other two
  $('.card-img-top').animate({
    opacity: 0.3
  }, 20)
  $(this).find('img').animate({
    opacity: 1
  }, 1);

  // Scroll to description div
  $('html, body').animate({
    scrollTop: $('#description').offset().top
  }, 500);
});
