<?php
	require '../../Global/common.php';
	checkLogin(); // check if the user is logged in before showing the page. If the user isn't logged in, redirect to the login page instead.

	include '../../Global/config.php';
	$sql = "SELECT * FROM `usersTable` WHERE userID='".$_SESSION["userID"]."'";

	$res = mysqli_query($connection, $sql);
	$num_row = mysqli_num_rows($res);
	$row = mysqli_fetch_assoc($res);
	
	//Save succesfully login email to session
	
	if ($num_row == 1) {
		//echo json_encode($row);
		if ($debugMode) { // print all the details retrieved from the usersTable in the database if debugMode is true.
			echo "DEBUG: " . $row["userID"] . "<br>"; // the contents of userID from the database query selection
			echo "DEBUG: " . $row["title"] . "<br>";
			echo "DEBUG: " . $row["firstName"] . "<br>";
			echo "DEBUG: " . $row["lastName"] . "<br>";
			echo "DEBUG: " . $row["dateOfBirth"] . "<br>";
			echo "DEBUG: " . $row["telephoneNumber"] . "<br>";
			echo "DEBUG: " . $row["email"] . "<br>";
			echo "DEBUG: " . $row["password"] . "<br>";
			echo "DEBUG: " . $row["verificationCode"] . "<br>";
			echo "DEBUG: " . $row["isVerified"] . "<br>";
			echo "DEBUG: " . $row["privledges"] . "<br>";
		}
		$data = $row;
	}
?>

<!DOCTYPE html>
<html class="no-js" lang="en" dir="ltr"> <!-- Hint to browsers that this page is in the "en" language region with left-to-right text direction. -->
    <head>
        <title>Home - Gloucestershire Constabulary</title>
        <meta charset="UTF-8"> <!-- Tell browsers that this code is written in the UTF-8 character set -->
		<meta http-equiv="x-ua-compatible" content="ie=edge"> <!-- Hint to Internet Explorer to use the latest engine available and not to fallback to compatibility mode -->
        <meta name="viewport" content="width=device-width, initial-scale=1"> <!-- Tell mobile browsers to scale this site to the actual device's width and scale factor, instead of treating it as a desktop site -->
		
        <link rel="stylesheet" href="../../Global/Framework/getmwf.com/local/css/main.css">
		<link rel="stylesheet" href="../../Global/Framework/assets.onestore.ms/cdnfiles/external/mwf/short/v1/latest/css/mwf-west-european-default.min.css" />
        
        <link href="../../Global/GlobalPublic.css" rel="stylesheet">
		<link href="Home.css" rel="stylesheet">
        
        <meta name="description" content="Homepage of the website for Gloucestershire Constabulary to reduce bicycle theft.">
        <meta name="keywords" content="Gloucestershire Constabulary, Constabulary">
        <meta name="author" content="Oscar Nardone">
    </head>
    <body>
        <!-- Accessibility requirement -->
        <a class="m-skip-to-main" href="#mainContent" tabindex="0">Skip to main content</a>

        <!-- Universal header -->
        <header class="c-universal-header theme-dark theme-transparent" role="banner">
            <div data-grid="container stack-2" style="margin-top: 16px;">
                <div data-grid="col-12">
                    <div data-grid="col-6">
                            <a href="../Home/Home.html" class="c-logo" aria-label="Logo">
                                <img class="c-image" src="../../Global/Images/small-long-logo3.png" alt="Gloucestershire Constabulary logo" itemscope itemtype="http://schema.org/ImageObject">
                                <span>Company</span>
                            </a>
                    </div>
                    <div data-grid="col-6" style="display: flex; flex-direction: column; align-items: right;">							
						<div aria-describedby="profileDropdown" id="menuBarProfile" class="m-persona-3" style="background: rgba(0, 0, 0, 0.5); box-shadow: rgba(0, 0, 0, 0.5) 0 0 4px 4px;">
							<div>
								<picture role="img" aria-label="Microsoft profile picture">
									<img class="c-image f-round personaProfilePic" src="" height="48" width="48" alt="Profile picture" id="personaSize3">
								</picture>
							</div>
							<div style="text-shadow: #000 0 0 4px;">
								<?php
									echo '<h5 class="c-heading personaFullName"><a>' . $row["firstName"] . " " . $row["lastName"] . '</a></h5>';
									echo '<p class="c-subheading theme-transparent-subtext brighter personaEmail">' . $row["email"] . '</p>';
								?>
							</div>
						</div>
						<div class="c-flyout" id="profileDropdown" role="tooltip" data-js-flyout-placement="bottom" data-js-flyout-dismissible="false" aria-hidden="true">
							<ul id="profileDropdownMenu" role="menu" class="c-menu" aria-hidden="false">
								<li class="c-menu-item" role="presentation">
									<a aria-checked="false" role="menuitem" href="../../Global/YourProfile/YourProfile.php">Your profile</a>
								</li>
								<li class="c-menu-item submenu" role="presentation">
									<a aria-checked="false" role="menuitem" href="../YourProfile/YourProfile.php#contactDetails">Contact details</a>
								</li>
								<li class="c-menu-item submenu" role="presentation">
									<a aria-checked="false" role="menuitem" href="../YourProfile/YourProfile.php#accountDetails">Account actions</a>
								</li>
								<li class="c-menu-item submenu" role="presentation">
									<a aria-checked="false" role="menuitem" href="../YourProfile/YourProfile.php#accessibilitySettings">Accessibility</a>
								</li>
								<li class="c-menu-item" role="presentation">
									<a aria-checked="false" role="menuitem" href="../../Global/Logout/Logout.php">Logout</a>
								</li>
							</ul>
						</div>
					</div>
                </div>
            </div>
		</header>

        <!-- Main page content should be wrapped with semantically meaningful html elements (e.g.: article, main) whenever possible. A div element can be used as long as it also contains a role="main" for Accessibility. -->
        <main id="mainContent" class="transparentPositioning theme-light">
            <!-- Modules should be stacked with a sibling relationship in order to programmatically adjust their position, margins, and padding. -->

			<section class="m-hero-item f-x-left f-y-bottom context-software f-mask-100 theme-light" itemscope itemtype="http://schema.org/SoftwareApplication" style="background: transparent;">
				<div>
					<div>
						<h1 class="c-heading">Welcome</h1>
						<p class="c-subheading">Let us guide you through the bicycle registration process, and you'll be done before you know it.</p>
						<div class="c-group">
							<a href="#" class="c-call-to-action c-glyph">
								<span>START GUIDE</span>
							</a>
							<a href="#" class="c-call-to-action c-glyph">
								<span>SKIP</span>
							</a>
						</div>
					</div>
				</div>
			</section>

			<br><br>
			<div class="m-content-placement" data-grid="col-12" style="text-shadow: #fff 0 0 4px; background: linear-gradient(to bottom, rgba(255, 255, 255, 0.0), rgba(255, 255, 255, 0.8) 60%);">
				<div data-grid="col-12 stack-3">
					<div data-grid="col-6 pad-6x">
						<div data-grid="col-6">
							<section class="m-content-placement-item f-size-medium">
								<!--<picture>
									<source srcset="http://placehold.it/358x201" media="(min-width: 1400px)">
									<source srcset="http://placehold.it/279x157" media="(min-width: 1084px)">
									<source srcset="http://placehold.it/494x278" media="(min-width: 768px)">
									<source srcset="http://placehold.it/348x195" media="(min-width: 540px)">
									<source srcset="http://placehold.it/491x276" media="(min-width:0)">
									<img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery">
								</picture>-->
								<div>
									<h3 class="c-heading">Your bikes</h3>
									<p class="c-paragraph">Register a bicycle, edit details of an existing registered bicycle, check the investigation status of a reported theft and more.</p>
									<a href="../BikesList/BikesList.php" class="c-call-to-action c-glyph">
										<span>VIEW YOUR BIKES</span>
									</a>
								</div>
							</section>
						</div>
						<div data-grid="col-6">
							<section class="m-content-placement-item f-size-medium">
								<!--<picture>
									<source srcset="http://placehold.it/358x201" media="(min-width: 1400px)">
									<source srcset="http://placehold.it/279x157" media="(min-width: 1084px)">
									<source srcset="http://placehold.it/494x278" media="(min-width: 768px)">
									<source srcset="http://placehold.it/348x195" media="(min-width: 540px)">
									<source srcset="http://placehold.it/491x276" media="(min-width:0)">
									<img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery">
								</picture>-->
								<div>
									<h3 class="c-heading">Report a theft</h3>
									<p class="c-paragraph">If you believe your registered bicycle has been lost or stolen, report a theft and get status updates on the investigation.</p>
									<a href="../ReportStolen/ReportStolen.php" class="c-call-to-action c-glyph">
										<span>REPORT</span>
									</a>
								</div>
							</section>
						</div>
					</div>
					<div data-grid="col-6 pad-6x">
						<div data-grid="col-6">
							<section class="m-content-placement-item f-size-medium">
								<!--<picture>
									<source srcset="http://placehold.it/358x201" media="(min-width: 1400px)">
									<source srcset="http://placehold.it/279x157" media="(min-width: 1084px)">
									<source srcset="http://placehold.it/494x278" media="(min-width: 768px)">
									<source srcset="http://placehold.it/348x195" media="(min-width: 540px)">
									<source srcset="http://placehold.it/491x276" media="(min-width:0)">
									<img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery">
								</picture>-->
								<div>
									<h3 class="c-heading">Your profile</h3>
									<p class="c-paragraph">Add and change your personal details, such as your contact details, preferred method of contact and profile picture.</p>
									<a href="../../Global/YourProfile/YourProfile.php" class="c-call-to-action c-glyph">
										<span>VIEW PROFILE</span>
									</a>
								</div>
							</section>
						</div>
						<div data-grid="col-6">
							<section class="m-content-placement-item f-size-medium">
								<!--<picture>
									<source srcset="http://placehold.it/358x201" media="(min-width: 1400px)">
									<source srcset="http://placehold.it/279x157" media="(min-width: 1084px)">
									<source srcset="http://placehold.it/494x278" media="(min-width: 768px)">
									<source srcset="http://placehold.it/348x195" media="(min-width: 540px)">
									<source srcset="http://placehold.it/491x276" media="(min-width:0)">
									<img srcset="http://placehold.it/491x276" src="http://placehold.it/491x276" alt="Placeholder with grey background and dimension watermark without any imagery">
								</picture>-->
								<div>
									<h3 class="c-heading">Help</h3>
									<p class="c-paragraph">Go here if you are experiencing difficulties with this service.</p>
									<a href="#" class="c-call-to-action c-glyph">
										<span>GET HELP</span>
									</a>
								</div>
							</section>
						</div>
					</div>
				</div>
				
				<!-- Footer -->
				<footer class="transparentFooter">
					<p class="c-paragraph">© <a href="https://oscarnardone.me">Oscar Nardone</a> and Jack Littlefair 2018</p>
				</footer>
			</div>
			<!--<footer class="c-universal-footer">
				<section>
					<ul role="contentinfo" class="c-list f-bare" style="float: right; padding: 2%; padding-top: 4%; background: transparent; color: #fff;"><li>© Oscar Nardone 2017</li></ul>
				</section>
			</footer>-->

			<!--<footer class="transparentFooter">
				<p class="c-paragraph">© <a href="https://oscarnardone.me">Oscar Nardone</a> 2017</p>
			</footer>-->
        </main>

		<script src="../../Global/Framework/assets.onestore.ms/cdnfiles/external/mwf/short/v1/latest/scripts/mwf-auto-init-main.var.min.js"></script>
		<script src="../../Global/Global.js"></script>
		<script>getUserProfile();</script>
    </body>
</html>