/* style.css
 * This file provides css styles.
 */

body,html {
	background-color: #3b4b54;
	width: 100%;
	height: 100%;
	margin: 0 auto;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
		"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
	color: #ffffff;
}

/* header footer common */
header, footer {
	width: 100%;
	text-align: center;
	color: #fff;
}



@media (max-width: 600px){
	.title, .tips, section{
		width: 100%;
	}
}

/* alignment */
.title, .tips, section {
	margin: 0 auto;
}

/* foreground color */
.title, .tips {
	xbackground-color: #2dcc70;
}



/* positions */
header {
	padding-top: 20px;
	font-weight: bolder;
	font-size: 1.3em;
}
footer {
	position: relative;
}
.title, .tips {
	height: 30px;
	padding-top: 10px;
	position: relative;
}
.title {
	border-radius: 40px 40px 0 0;
}
.tips {
	border-radius: 0 0 40px 40px;
}

table {
	table-layout: fixed;
	word-wrap: break-word;
	position: relative;
	border-collapse: collapse;
	width: 100%;
}
.content {
	padding: 5px;
	width: 60%;

}
.contentName {
	padding: 5px;
	width: 30%;
	font-weight:bold;
}
.contentAction {
	padding: 5px;
	width: 10%;
	font-weight:bold;
}

.records textarea {
	height: 1.2em;
	font-size: 1em;
	resize: none;
	width: 100%;
	border: none;
	background-color: transparent;
	color: #fff;
	font-family: "HelveticaNeue-Light", "Helvetica Neue Light",
		"Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
	font-size: .9em;
}



/* buttons */
.detailBtn {
	position: absolute;
	left: 20px;
	top: 10px;
	background: none;
	border: none;
	cursor: pointer;
}
.addBtn {
  position: absolute;
  right: 20px;
  top: 0px;
  background: none;
  border: none;
  cursor: pointer;
}
.detailBtn img{
	width: 20px;
	height: 20px;
}
.deleteBtn{
  background-image: url("../images/sprite.png");
  background-position: -5px -588px;
  width: 16px;
  height: 16px;
    display:inline-block;
}

tr:hover .deleteBtn {
	
	cursor: pointer;
}


.tableRows{
	border-bottom: solid thin;
	border-color:#26343f;
}

.leftHalf {
	float: left;
	background-color: #26343f;
	width: 45%;
	height: 100%;
}

.rightHalf {
	float: right;
	width: 55%;
	background-color: #313f4a;
	height: 100%;
	overflow: auto;
}

.fieldname {
	text-align: right;
	border-right: 1px solid #fff;
}


#appinfo {
	border-top: 1px solid #fff;
}
#appinfo td {
	padding: 5px;
	height: 50;
	font-size: small;
	
}



.errorMsg {
	color: red;
	font-weight:normal;
}
.newappIcon {
  padding-top: 10%;
  display: block;
  max-width: 200px;
  max-height: 200px;
  margin: 0 auto;
  padding-bottom: 2em;
}

h1 {
  font-weight: bold;
  font-size: 2em;
  padding-left: 10%;
  padding-right: 10%;
  margin: 0 auto;
  text-align: center;
}

.description {
  padding-left: 50px;
  padding-right: 50px;
  text-align: center;
}

a {
  text-decoration: none;
  color: #00aed1;
}