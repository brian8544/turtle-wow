<!DOCTYPE html>
<?php require_once('./header.php'); ?>
<div class="turtle-main"><div class="turtle-block"><div class="turtle-register"><div class="turtle-register-title"> 
<p>Forgot your password?
<span>Enter your username and e-mail and we will send you a new one!<br>
<?php if (isset($_REQUEST['ErrorMessage'])) { ?><span style="color: red;"><?php echo htmlentities($_REQUEST['ErrorMessage']) ?></p><?php } ?>
<?php if (isset($_REQUEST['SuccessMessage'])) { ?><span style="color: #84e543;"><?php echo htmlentities($_REQUEST['SuccessMessage']) ?></p><?php } ?></p>
</div> 
<form id="form" class="turtle-register-form" method="post" action="../password_reset.php">
<div class="turtle-input-list" style="display:flex; flex-wrap: no-wrap; width: 100%;">
<input type="text" name="Username" placeholder="Username" style="min-width:45.7%;">
<input type="text" name="EmailAddress" placeholder="E-mail address" style="min-width:45.7%;">
<input type="submit" value="I'm a dumb turtle and forgot my password!" style="font-size: 16px; height: 32px;">
</div></form></div></div>
<?php require_once ('./footer.php') ?>
</body></html>

