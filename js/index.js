$(document).ready(function(){
	
	
	// values to keep track of the number of letters typed, which quote to use. etc. Don't change these values.
	var i = 0,
		a = 0,
		isBackspacing = false,
		isParagraph = false;

	// Typerwrite text content. Use a pipe to indicate the start of the second line "|".  
	var textArray = [
		" Hey, this is| Eva Chu!", 
		"Before going to university, I studied science and engineering, hoping to work in this field.", 
		"Due to my Advanced Subjects Test grades, I graduated from National Tsinghua University, majoring in economics.",
		"After that, I went to financial industry.",
		"It disappointed me and kept me away from my dreams.",
		"After getting into programming, I was completely taken with it.",
		"It completes me, |so please let me complete your masterpiece.",
		"Please Type 'Hello World' To Continue."
	];

	// Speed (in milliseconds) of typing.
	var speedForward = 100, //Typing Speed
		speedWait = 1000, // Wait between typing and backspacing
		speedBetweenLines = 1000, //Wait between first and second lines
		speedBackspace = 25; //Backspace Speed

	var runTypeWriter = true;

	//Run the loop
	window.onload = typeWriter("output", textArray);

	function typeWriter(id, ar) {
		if (runTypeWriter) {
			var element = $("#" + id),
				aString = ar[a],
				eHeader = element.children("#typingFront"), //Header element
				eParagraph = element.children("#typingEnd"); //Subheader element
				
			$("#skipTypingButton").click(function(){
				runTypeWriter = false;
				$("#bg-img").css("backgroundImage", "url(./img/cover/banner2.jpg)");
				$("#bg-img").css("transition", "background-image 3s");
				$("#navbar").fadeIn(3000);
				$("#headerH1").fadeIn(3000);
				$("#headerH5").fadeIn(3000);
				$("#headerDown").fadeIn(3000);
				$("#content").fadeIn(3000);
				$("#footerContent").fadeIn(3000);
				$("#skipTypingButton").hide();
				$("header #typingFront").hide();
				$("header #typingEnd").hide();
			})
			
			// Determine if animation should be typing or backspacing
			if (!isBackspacing) {
		
				// If full string hasn't yet been typed out, continue typing
				if (i < aString.length) {
		  
				// If character about to be typed is a pipe, switch to second line and continue.
				if (aString.charAt(i) == "|") {
					isParagraph = true;
					eHeader.removeClass("cursor");
					eParagraph.addClass("cursor");
					i++;
					setTimeout(function(){ typeWriter(id, ar); }, speedBetweenLines);
			
				// If character isn't a pipe, continue typing.
				} else {
					// Type header or subheader depending on whether pipe has been detected
					if (!isParagraph) {
						eHeader.innerHTML = eHeader.text(eHeader.text() + aString.charAt(i));
					} else {
						eParagraph.innerHTML = eParagraph.text(eParagraph.text() + aString.charAt(i));
					}
					i++;
					setTimeout(function(){ typeWriter(id, ar); }, speedForward);
				}
		  
				// If full string has been typed, switch to backspace mode.
				} else if (i == aString.length) {
		  
					isBackspacing = true;
					setTimeout(function(){ typeWriter(id, ar); }, speedWait);
		  
				}
		
			// If backspacing is enabled
			} else {
		
				// If either the header or the paragraph still has text, continue backspacing
				if (eHeader.text().length > 0 || eParagraph.text().length > 0) {
		  
					// If paragraph still has text, continue erasing, otherwise switch to the header.
					if (eParagraph.text().length > 0) {
						eParagraph.text(eParagraph.text().substring(0, eParagraph.text().length - 1));
					} else if (eHeader.text().length > 0) {
						eParagraph.removeClass("cursor");
						eHeader.addClass("cursor");
						eHeader.text(eHeader.text().substring(0, eHeader.text().length - 1));
					}
					setTimeout(function(){ typeWriter(id, ar); }, speedBackspace);
		
				// If neither head or paragraph still has text, switch to next quote in array and start typing.
				} else { 
					if (a < ar.length) {
						isBackspacing = false; 
						i = 0;
						isParagraph = false;
						if (a === (ar.length - 1 )) {
						document.getElementById("helloWorldInput").style.display = "inline-block";
						$("header #typingFront").hide();
						$("header #typingEnd").hide();
						$("#skipTypingButton").hide();
						}
						a++; //Moves to next position in array, always looping back to 0
						setTimeout(function(){ typeWriter(id, ar); }, 50);
						} 

				}
			}
		}	
	}


	//after typing "Hello World"
	function showHint(str) {
		if (str.toLowerCase() === "hello world") {
			$("#bg-img").css("backgroundImage", "url(./img/cover/banner2.jpg)");
			$("#bg-img").css("transition", "background-image 3s");			
			$("header input").hide();  
			$("#navbar").fadeIn(3000);
			$("#headerH1").fadeIn(3000);
			$("#headerH5").fadeIn(3000);
			$("#headerDown").fadeIn(3000).css("display","block");
			$("#content").fadeIn(3000);
			$("#footerContent").fadeIn(3000);	
		}
	}
		
		
	//equipment filter
	$(".filter").on("click", ".showAll", function(){
		$(".equipment").hide();
		$(".equipment").filter(".showAll").show();
	});

	$(".filter").on("click", ".frontEnd", function(){
		$(".equipment").hide();
		$(".equipment").filter(".frontEnd").show();
	});

	$(".filter").on("click", ".backEnd", function(){
		$(".equipment").hide();
		$(".equipment").filter(".backEnd").show();
	});

	$(".filter").on("click", ".otherTools", function(){
		$(".equipment").hide();
		$(".equipment").filter(".otherTools").show();
	});

	$("#equipment").on("click", ".otherTools", function(){
		$(".equipment").hide();
		$(".equipment").filter(".otherTools").show();
	});


    //GoTop Event
    $('#goTop').click(function(){
        $('html,body').animate({ scrollTop: 0 }, 'slow');   //back to top
        return false;
    });
    
	
    //scroll over 1000px, add animate; scroll over 400px, GoTop appear
    $(window).scroll(function() {
		if ( $(this).scrollTop() > 1000 && $(this).width() >= 576){
            $('.achievementImg').addClass('animate__animated animate__rollIn');	
        } else if ( $(this).scrollTop() > 400){
            $('#goTop').fadeIn();	
        } else {
            $('#goTop').fadeOut();
        };
    });
	  
	  
	//achievement image change
	$(".achievementImg").click(function(){
		$(this).children(".after").fadeToggle();
		$(this).children(".before").fadeToggle();
	})
})