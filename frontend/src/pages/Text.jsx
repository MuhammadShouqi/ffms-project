import React from 'react'

const Text = () => {
  return (
   <?php
include "config.php";
session_start();
$err="";
?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8" />
	<meta http-equiv="X-UA-Compatible" content="IE=edge" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Deev Bet | Sign up</title>
    <link rel="icon" type="image/x-icon" href="../../public/favicon.png" />
    <link href="dist/output.css" rel="stylesheet" />
    <!-- <link href="style.css" rel="stylesheet" /> -->
    <link href="node_modules/bootstrap-icons/font/bootstrap-icons.css" rel="stylesheet" />
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
    <script src="js/jquery.min.js"></script>
    <script src="js/sweetalert.min.js"></script>
</head>
<body>
	<div class="md:flex md:h-screen">
		<div class="w-4/12 hidden md:flex flex-col relative h-full overflow-y-scroll">
			<div class="pt-6 pl-4 p-4 pb-2 bg-primary z-30 flex justify-between items-center">
				<a href="#">
					<img class="w-36" src="public/logo_light.png" alt="logo" />
				</a>
				<button id="navBar" class="flex flex-col ml-4">
					<span class="w-6 h-1 bg-white mb-1"> </span>
					<span class="w-6 h-1 bg-white mb-1"> </span>
					<span class="w-6 h-1 bg-white mb-1"> </span>
				</button>
			</div>
			<div class="hidden md:block relative">
				<nav id="deskLinks"
					class="navLinks text-gray-800  bg-tertiary w-full z-20 dark:text-white uppercase text-base absolute -top-[150px] invisible block transition-all ease-in-out duration-1000">
					<a href="./"
						class="border-b border-green-500 block py-4 pl-4 hover:bg-secondary  font-semibold transition text-white duration-150">
						Log in
					</a>

					<a href="register.php"
						class="block py-4 pl-4 hover:bg-secondary font-semibold transition text-white duration-150">
						Become an Agent
					</a>
				</nav>
			</div>
			<div class="pt-20 px-4">
				<div class="mt-20 p-2 anitext">
					<h1 class=" write text-3xl text-wrap text-white">
						Stay ahead of the game
					</h1>
					<p class=" text-3xl text-wrap text-white">with our seamless wallet
						<span class="inline-block lg:block">online platform!</span>
					</p>
				</div>
			</div>
			<div class="text-center absolute bottom-2 w-full flex flex-wrap justify-between px-2">
				<a class=" whitespace-nowrap text-tertiary hover:text-secondary-light" href="#">©
					DeevBet 2023</a>
				<a class=" whitespace-nowrap text-tertiary hover:text-secondary-light" href="#"> </a>
			</div>
		</div>
		<div class="md:hidden flex-col absolute top-0 z-10 bg-[#027b5b] w-full">
			<!-- mobile nav -->
			<div class="p-4 flex bg-primary z-30 justify-between items-center">
				<img class="h-18 w-36" src="public/logo_light.png" alt="logo" />
				<button id="navBtn" class="lg:hidden flex flex-col ml-4">
					<span class="w-6 h-1 bg-white mb-1"> </span>
					<span class="w-6 h-1 bg-white mb-1"> </span>
					<span class="w-6 h-1 bg-white mb-1"> </span>
				</button>
			</div>
			<!-- mobile navLinks -->
			<div class="w-full md:hidden relative">
				<nav id="navLinks" class="bg-tertiary w-full -z-20 text-gray-800 dark:text-white uppercase text-base absolute -top-[150px] invisible block transition-all ease-in-out duration-1000">
					<a href="./" class="border-b border-green-500 block hover:text-[#edcd2a] py-4 pl-4 hover:bg-primary-light font-semibold transition text-white duration-150">
						Log in
					</a>

					<a href="register.php" class="block hover:text-[#edcd2a] py-4 pl-4 hover:bg-primary-light font-semibold transition text-white duration-150">
						Become an Agent
					</a>
				</nav>
			</div>
		</div>
		<div class="pattern bg-repeat w-full md:w-8/12 h-full md:overflow-y-scroll md:p-4">
			<div class="p-3 md:p-6">
				<h1 class="text-2xl font-semibold">Create account</h1>
			</div>
			<form id="aform" method="post" enctype="multipart/form-data" class="w-full pt-2 px-4">
				<div class="md:flex justify-center gap-5 px-2 pt-5">
					<div class="mb-3 w-full">
						<label class="form-label block mb-1 text-gray-800 font-semibold" for="firstname">First Name
							<span class="text-red-600">*</span></label>
						<input name="fname" type="text" required placeholder="Please type in your First Name"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="Sname"
							for="Sur Name">Surname<span class="text-red-600"> *</span></label>
						<input name="sname" type="text" required placeholder="Please type in your surName"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="email"
							for="First Name">Email<span class="text-red-600"> *</span></label>
						<input name="email" type="email" placeholder="Please type in your Email"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="gender"
							for="gender">Gender<span class="text-red-600"> *</span></label>
						<select
							class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="gender" id="gender" required>
							<option value="" selected="selected">- Select -</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label for="phone" class="form-label inline-block mb-1 text-gray-800 font-semibold">Phone
							Number<span class="text-red-600 font-bold"> *</span></label>
						<input name="phone" type="number" required placeholder="Please type in your Phone Number"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold"
							for="alternate-phone">Alternate Phone</label>
						<input type="number" name="alt_phone"
							placeholder="Please type in your Alternative Phone Number"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="academic"
							class="">Highest Academic Qualification</label>
						<select
							class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="academic" id="academic">
							<option value="" selected="selected">- Select -</option>
							<option value="Basic">Basic Education /No school</option>
							<option value="primary">Primary /School certificate</option>
							<option value="HIC">Higher Institution Certificate</option>
							<option value="SSCE">SSCE</option>
							<option value="OND">OND</option>
							<option value="HND">HND</option>
							<option value="Bsc">Degree</option>
							<option value="PHD">PHD</option>
							<option value="others">Others</option>
						</select>
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="dob" id="dob"
							class="">Date of birth<span class="text-red-500"> *</span></label>
						<input
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="date" name="dob" id="dob" required />
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" id="shopAddress"
							for="shopAddress">Shop Address<span class="text-red-500"> *</span></label>
						<input name="shopAddress" type="text" required placeholder="Please type in your Shop Address"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" id="busstop"
							for="Password">Nearest Bus stop<span class="text-red-500"> *</span></label>
						<input name="busstop" type="text" required placeholder="Please type in your Nearest Busstop"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold">State/Province<span
								class="text-red-500"> *</span></label>
						<select
							class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="state" id="state" class="form-control">
							<option value="" selected="selected">Choose State</option>
							<?php
							$state = "SELECT * FROM states";
							$result = $conn->query($state);
							if ($result->num_rows > 0) {
								while($row = $result->fetch_assoc()) {
									$state_name = $row['name'];
									$state_id = $row['id'];
							?>
							<option value="<?php echo $state_id ?>"> <?php echo $state_name ?> </option>
							<?php
								}
							}
							?>
						</select>
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold">LGA/Local
							Government<span class="text-red-600 font-bold"> *</span></label>
						<select
							class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="lga" id="resps" class="form-control select-lga" required>
							<option value="" selected="selected">Choose LGA</option>
						</select>
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold">Commission Type<span
								class="text-red-500"> *</span></label>
						<select class="form-select appearance-none block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							name="commission" id="" required placeholder="Select your commission">
							<option value="7% on sales">7% on sales</option>
						</select>
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold">How did you hear about
							us</label>
						<input name="about" type="text" placeholder="Please type in your How did you hear about us"
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" />
					</div>
				</div>
				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="passport">Your
							Passport Photograph<span class="text-red-600"> *</span></label>
						<input
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="file" name="passport" required
							placeholder="Please type in your How did you hear about us" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="IDcard">Upload your
							Valid ID Card<span class="text-red-600"> *</span></label>
						<input
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="file" name="IDcard" placeholder="Please type in your How did you hear about us" />
					</div>
				</div>

				<div class="md:flex justify-center gap-5 px-2">
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="shop-outside">Shop
							picture taken from outside<span class="text-red-600"> *</span></label>
						<input
							class="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="file" name="shop_outside" placeholder="Please type in your How did you hear about us" />
					</div>
					<div class="mb-3 w-full">
						<label class="form-label inline-block mb-1 text-gray-800 font-semibold" for="shop-inside">Shop
							picture taken inside<span class="text-red-600"> *</span></label>
						<input
							class="form-control block w-full px-3 py-1 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
							type="file" name="shop_inside" placeholder="Please type in your How did you hear about us" />
					</div>
				</div>
				<div class="form-check px-4 py-2">
					<input name="terms" id="terms"
						class="form-check-input appearance-none rounded-md h-4 w-4 border-2 border-green-700 bg-white checked:bg-green-800 checked:border-green-700 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
						type="checkbox" required /><a class="text-blue-500" href="/">I agree with deevbet Online Rules and shop
						rules</a>
				</div>
				
					<div id="resp"></div>
				<div class="w-full p-2 pt-4 flex justify-center">
					<button type="submit"
						class="inline-block px-6 py-2.5 w-full md:max-w-[400px] text-white font-medium text-md leading-tight uppercase rounded-xl shadow-lg hover:shadow-lg bg-primary hover:bg-tertiary transition duration-150 ease-in-out">
						Create Account
					</button>
				</div>
				<p class="text-center mt-2">
					Already have an account?<a class="text-blue-500" href="./">
						Login</a>
				</p>
			</form>
			<div class="md:hidden text-center pt-4 text-tertiary hover:text-secondary">
				<a href="#">© DeevBet 2023</a>
			</div>
		</div>
	</div>

	<style>
		.anitext:first-of-type {
			animation: showup 7s infinite;
		}

		.anitext:last-of-type p {
			animation: slidein 7s infinite;
		}

		.anitext:last-of-type span {
			animation: slidein 7s infinite;
		}

		@keyframes showup {
			0% {
				opacity: 0;
			}

			20% {
				opacity: 1;
			}

			80% {
				opacity: 1;
			}

			100% {
				opacity: 0;
			}
		}

		@keyframes slidein {
			0% {
				margin-left: -800px;
			}

			20% {
				margin-left: -800px;
			}

			35% {
				margin-left: 0px;
			}

			100% {
				margin-left: 0px;
			}
		}

		.pattern {
			background-image: url(public/download.jfif) !important;
		}

		body {
			background-repeat: no-repeat;
			background-position: right top;
			background-image: webkit-linear-gradient(315deg,
					rgb(2, 123, 91) 0%,
					rgb(2, 123, 91) 70%,
					rgb(22, 30, 75) 100%);
			background: linear-gradient(to bottom, #027b5b 70%, #027b5b 100%),
				url(public/wallets.svg) !important;
		}

		.debug {
			border: 1px red solid;
		}

		.open {
			visibility: visible;
			top: 0;
		}
	</style>
	<script>
		const deskLinks = document.getElementById("deskLinks");
		const navLinks = document.getElementById("navLinks");
		const navBtn = document.getElementById("navBtn");
		const navbar = document.getElementById("navBar");
		function closeNav() {
			// deskLinks.style.display = "block"
			// console.log("i will colse the navBar");
			if (deskLinks.classList.contains("open")) {
				deskLinks.classList.remove("open");
			} else {
				deskLinks.classList.add("open");
			}
		}

		function closeMob() {
			// deskLinks.style.display = "block"
			// console.log("i will colse the navBar");
			if (navLinks.classList.contains("open")) {
				navLinks.classList.remove("open");
			} else {
				navLinks.classList.add("open");
			}
		}
		// desktop nav
		navbar.addEventListener("click", () => {
			closeNav();
			// console.log("navbar clicked");
		});
		// mobile nav
		navBtn.addEventListener("click", () => {
			closeMob();
			// console.log("navbtn clicked");
		});
	</script>
	    <script>
$(document).ready(function () {

	$("#state").change(function() {
	$("#resps").html("");
	var formData = {
		state: $("#state").val(),
	};
	$.ajax({
		type: "POST",
		url: "checkstate.php",
		data: formData,
	}).done(function(data) {

		$("#resps").html(data);
	});
	});

  // submit registeration
  $("#aform").submit(function(e) {
    e.preventDefault();

    $("#resp").html("<p class='w-full text-center text-red-500 italic text-xl'>Verifying</p>");
    var formData = new FormData(this);

	$.ajax({
        url: 'sign.php',
        type: 'POST',
        data: formData,
        success: function (data) {
            if(data == 'yes'){
                window.location.href = "confirm.php";
            }else{
           $("#resp").html(data);
            }
          // $("#aform")[0].reset();
        },
        cache: false,
        contentType: false,
        processData: false
    });
});

});
</script>
<script src='script.js'></script>
    <script src="node_modules/flowbite/dist/flowbite.min.js"></script>
    <script src='node_modules/alpinejs/src/alpine.js'></script>
    <script src='node_modules/alpinejs/dist/cdn.js'></script>
    <script src="https://cdn.jsdelivr.net/gh/alpine-collective/alpine-magic-helpers@0.6.x/dist/component.min.js"></script>
    <script src="https://cdn.jsdelivr.net/gh/alpinejs/alpine@v2.8.0/dist/alpine.min.js" defer></script>
    <script src="node_modules/preline/dist/preline.js"></script>

</body>

</html>
}

export default Text