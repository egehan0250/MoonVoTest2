module.exports = function () {
     let adminnav = `      <div class="page-header">
        <div class="header-wrapper row m-0"> 
          <div class="header-logo-wrapper col-auto p-0">
            <div class="logo-wrapper"><a href="index.html"><img class="img-fluid" src="/Zetaadmindash/assets/images/logo/logo.png" alt=""></a></div>
            <div class="toggle-sidebar">
              <div class="status_toggle sidebar-toggle d-flex">        
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g> 
                    <g> 
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0003 6.6738C21.0003 8.7024 19.3551 10.3476 17.3265 10.3476C15.2979 10.3476 13.6536 8.7024 13.6536 6.6738C13.6536 4.6452 15.2979 3 17.3265 3C19.3551 3 21.0003 4.6452 21.0003 6.6738Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3467 6.6738C10.3467 8.7024 8.7024 10.3476 6.6729 10.3476C4.6452 10.3476 3 8.7024 3 6.6738C3 4.6452 4.6452 3 6.6729 3C8.7024 3 10.3467 4.6452 10.3467 6.6738Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M21.0003 17.2619C21.0003 19.2905 19.3551 20.9348 17.3265 20.9348C15.2979 20.9348 13.6536 19.2905 13.6536 17.2619C13.6536 15.2333 15.2979 13.5881 17.3265 13.5881C19.3551 13.5881 21.0003 15.2333 21.0003 17.2619Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M10.3467 17.2619C10.3467 19.2905 8.7024 20.9348 6.6729 20.9348C4.6452 20.9348 3 19.2905 3 17.2619C3 15.2333 4.6452 13.5881 6.6729 13.5881C8.7024 13.5881 10.3467 15.2333 10.3467 17.2619Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </g>
                </svg>
              </div>
            </div>
          </div>
          <div class="left-side-header col ps-0 d-none d-md-block">
            <div class="input-group"><span class="input-group-text" id="basic-addon1">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g> 
                    <g> 
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2753 2.71436C16.0029 2.71436 19.8363 6.54674 19.8363 11.2753C19.8363 16.0039 16.0029 19.8363 11.2753 19.8363C6.54674 19.8363 2.71436 16.0039 2.71436 11.2753C2.71436 6.54674 6.54674 2.71436 11.2753 2.71436Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                      <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8987 18.4878C20.6778 18.4878 21.3092 19.1202 21.3092 19.8983C21.3092 20.6783 20.6778 21.3097 19.8987 21.3097C19.1197 21.3097 18.4873 20.6783 18.4873 19.8983C18.4873 19.1202 19.1197 18.4878 19.8987 18.4878Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                    </g>
                  </g>
                </svg></span>
              <input class="form-control" type="text" placeholder="Birşeyler ara.." aria-label="search" aria-describedby="basic-addon1">
            </div>
          </div>
          <div class="nav-right col-10 col-sm-6 pull-right right-header p-0">
            <ul class="nav-menus">
              <li>
                <div class="mode animated backOutRight">
                  <svg class="lighticon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <g>                 
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.1377 13.7902C19.2217 14.8742 16.3477 21.0542 10.6517 21.0542C6.39771 21.0542 2.94971 17.6062 2.94971 13.3532C2.94971 8.05317 8.17871 4.66317 9.67771 6.16217C10.5407 7.02517 9.56871 11.0862 11.1167 12.6352C12.6647 14.1842 17.0537 12.7062 18.1377 13.7902Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </svg>
                  <svg class="darkicon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12Z"></path>
                    <path d="M18.3117 5.68834L18.4286 5.57143M5.57144 18.4286L5.68832 18.3117M12 3.07394V3M12 21V20.9261M3.07394 12H3M21 12H20.9261M5.68831 5.68834L5.5714 5.57143M18.4286 18.4286L18.3117 18.3117" stroke-linecap="round" stroke-linejoin="round"></path>
                  </svg>
                </div>
              </li>
              <li class="d-md-none resp-serch-input">
                <div class="resp-serch-box"><i data-feather="search"></i></div>
                <div class="form-group search-form">
                  <input type="text" placeholder="Birşeyler Ara...">
                </div>
              </li>
              <li class="cart-nav onhover-dropdown">
                <div class="cart-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <g>
                        <path d="M5.52377 7C9.41427 5.74386 13.9724 5.45573 16 5.5C18.0276 5.54427 18.8831 6.2663 19.5 7.5C20.5 9.5 20.289 14.4881 18.5 16.0871C16.712 17.6861 9.33015 17.8381 6.87015 16.0871C4.27115 14.2361 5.629 9.192 5.544 5.743C5.595 3.813 3.5 3.5 3.5 3.5" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M13 10.5H15.773" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.26399 20.1274C7.56399 20.1274 7.80799 20.3714 7.80799 20.6714C7.80799 20.9724 7.56399 21.2164 7.26399 21.2164C6.96299 21.2164 6.71899 20.9724 6.71899 20.6714C6.71899 20.3714 6.96299 20.1274 7.26399 20.1274Z" fill="#130F26" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M17.5954 20.1274C17.8964 20.1274 18.1404 20.3714 18.1404 20.6714C18.1404 20.9724 17.8964 21.2164 17.5954 21.2164C17.2954 21.2164 17.0514 20.9724 17.0514 20.6714C17.0514 20.3714 17.2954 20.1274 17.5954 20.1274Z" fill="#130F26" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </svg><span class="badge rounded-pill badge-primary">0</span>
                </div>
                <div class="cart-dropdown onhover-show-div">
                  <div class="dropdown-title">             
                    <h3>Sepet             </h3><a class="f-right" href="cart.html"> <i data-feather="shopping-bag">                </i></a>
                  </div>
                 
                </div>
          
              <li class="onhover-dropdown">
                <div class="notification-box">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <g>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M11.9961 2.51416C7.56185 2.51416 5.63519 6.5294 5.63519 9.18368C5.63519 11.1675 5.92281 10.5837 4.82471 13.0037C3.48376 16.4523 8.87614 17.8618 11.9961 17.8618C15.1152 17.8618 20.5076 16.4523 19.1676 13.0037C18.0695 10.5837 18.3571 11.1675 18.3571 9.18368C18.3571 6.5294 16.4295 2.51416 11.9961 2.51416Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M14.306 20.5122C13.0117 21.9579 10.9927 21.9751 9.68604 20.5122" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </svg><span class="badge rounded-pill badge-warning">2 </span>
                </div>
                <div class="onhover-show-div notification-dropdown">
                  <div class="dropdown-title">
                    <h3>Bildirim</h3><a class="f-right" href="cart.html"> <i data-feather="bell">                           </i></a>
                  </div>
                  <ul class="custom-scrollbar">
                    <li>
                      <div class="media">
                        <div class="notification-img bg-light-primary"><img src="../assets/images/avtar/man.png" alt=""></div>
                        <div class="media-body">
                          <h5> <a class="f-14 m-0" href="user-profile.html">MoonVo</a></h5>
                          <p>Discord Sunucumuza Davetlisin!</p>
                        </div>
                        <div class="notification-right"><a href="#"><i data-feather="x"></i></a></div>
                      </div>
                    </li>
                    <li> 
                      <div class="media">
                        <div class="notification-img bg-light-secondary"><img src="../assets/images/avtar/teacher.png" alt=""></div>
                        <div class="media-body">
                          <h5> <a class="f-14 m-0" href="user-profile.html">Destek Ekibi</a></h5>
                          <p>Yardıma İhtiyacın var mı? </p>
                        </div>
                        <div class="notification-right"><a href="#"><i data-feather="x"></i></a></div>
                      </div>
                    </li>
                    <li class="p-0"><a class="btn btn-primary" href="#">Hepsini Okundu işaretle</a></li>
                  </ul>
                </div>
              </li>
              <li class="maximize"><a class="text-dark" href="#!" onclick="javascript:toggleFullScreen()">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g> 
                      <g>    
                        <path d="M2.99609 8.71995C3.56609 5.23995 5.28609 3.51995 8.76609 2.94995" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M8.76616 20.99C5.28616 20.41 3.56616 18.7 2.99616 15.22L2.99516 15.224C2.87416 14.504 2.80516 13.694 2.78516 12.804" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M21.2446 12.804C21.2246 13.694 21.1546 14.504 21.0346 15.224L21.0366 15.22C20.4656 18.7 18.7456 20.41 15.2656 20.99" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M15.2661 2.94995C18.7461 3.51995 20.4661 5.23995 21.0361 8.71995" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </svg></a></li>
              <li class="profile-nav onhover-dropdown pe-0 py-0 me-0">
                <div class="media profile-media">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g> 
                      <g> 
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.55851 21.4562C5.88651 21.4562 2.74951 20.9012 2.74951 18.6772C2.74951 16.4532 5.86651 14.4492 9.55851 14.4492C13.2305 14.4492 16.3665 16.4342 16.3665 18.6572C16.3665 20.8802 13.2505 21.4562 9.55851 21.4562Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M9.55849 11.2776C11.9685 11.2776 13.9225 9.32356 13.9225 6.91356C13.9225 4.50356 11.9685 2.54956 9.55849 2.54956C7.14849 2.54956 5.19449 4.50356 5.19449 6.91356C5.18549 9.31556 7.12649 11.2696 9.52749 11.2776H9.55849Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M16.8013 10.0789C18.2043 9.70388 19.2383 8.42488 19.2383 6.90288C19.2393 5.31488 18.1123 3.98888 16.6143 3.68188" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                        <path d="M17.4608 13.6536C19.4488 13.6536 21.1468 15.0016 21.1468 16.2046C21.1468 16.9136 20.5618 17.6416 19.6718 17.8506" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                      </g>
                    </g>
                  </svg>
                </div>
                <ul class="profile-dropdown onhover-show-div">
                  <li><a href="#bakım"><i data-feather="user"></i><span>Hesap </span></a></li>
                  <li><a href=""><i data-feather="mail"></i><span>Destek Taleplerim</span></a></li>
                  <li><a href="/my/servers"><i data-feather="file-text"></i><span>Sunucularım</span></a></li>
                  <li><a href="#bakım"><i data-feather="settings"></i><span>HDiesap Ayarları</span></a></li>
                  <li><a href="/logout"><i data-feather="log-in"> </i><span>Çıkış yap</span></a></li>
                </ul>
              </li>
            </ul>
          </div>
          <script class="result-template" type="text/x-handlebars-template">
            <div class="ProfileCard u-cf">                        
            <div class="ProfileCard-avatar"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-airplay m-0"><path d="M5 17H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1"></path><polygon points="12 15 17 21 7 21 12 15"></polygon></svg></div>
            <div class="ProfileCard-details">
            <div class="ProfileCard-realName">{{name}}</div>
            </div>
            </div>
          </script>
          <script class="empty-template" type="text/x-handlebars-template"><div class="EmptyMessage">Your search turned up 0 results. This most likely means the backend is down, yikes!</div></script>
        </div>
      </div>
      <!-- Page Header Ends                              -->
      <!-- Page Body Start-->
      <div class="page-body-wrapper">
        <!-- Page Sidebar Start-->
        <div class="sidebar-wrapper"> 
          <div>
            <div class="logo-wrapper"><a href="index.html"><img class="img-fluid for-light" src="https://i.hizliresim.com/dstx6l2.png" alt=""><img class="img-fluid for-dark" src="https://i.hizliresim.com/n854ct4.png" alt=""></a>
              <div class="back-btn"><i class="fa fa-angle-left"></i></div>
            </div>
            <div class="logo-icon-wrapper"><a href="index.html"><img class="img-fluid" src="/Zetaadmindash/assets/images/logo-icon.png" alt=""></a></div>
            <nav class="sidebar-main">
              <div class="left-arrow" id="left-arrow"><i data-feather="arrow-left"></i></div>
              <div id="sidebar-menu">
                <ul class="sidebar-links" id="simple-bar">
                  <li class="back-btn"><a href="index.html"><img class="img-fluid" src="/Zetaadmindash/assets/images/logo-icon.png" alt=""></a>
                    <div class="mobile-back text-end"><span>Geri</span><i class="fa fa-angle-right" aria-hidden="true">        </i></div>
                  </li>
                  <li class="sidebar-list">
                    <label class="badge badge-light-primary">2</label><a class="sidebar-link sidebar-title" href="#">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g>
                          <g> 
                            <path d="M9.07861 16.1355H14.8936" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.3999 13.713C2.3999 8.082 3.0139 8.475 6.3189 5.41C7.7649 4.246 10.0149 2 11.9579 2C13.8999 2 16.1949 4.235 17.6539 5.41C20.9589 8.475 21.5719 8.082 21.5719 13.713C21.5719 22 19.6129 22 11.9859 22C4.3589 22 2.3999 22 2.3999 13.713Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Dashboard</span></a>
                    <ul class="sidebar-submenu">
                      <li><a href="/dashboard">Ana sayfa</a></li>
                      <li><a href="/admin_dash">Admin dash</a></li>
                    </ul>
                  </li>
                
                  <li class="sidebar-list"><a class="sidebar-link sidebar-title link-nav" href="/admin/searchuser">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g> 
                          <g> 
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2753 2.71436C16.0029 2.71436 19.8363 6.54674 19.8363 11.2753C19.8363 16.0039 16.0029 19.8363 11.2753 19.8363C6.54674 19.8363 2.71436 16.0039 2.71436 11.2753C2.71436 6.54674 6.54674 2.71436 11.2753 2.71436Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8987 18.4878C20.6778 18.4878 21.3092 19.1202 21.3092 19.8983C21.3092 20.6783 20.6778 21.3097 19.8987 21.3097C19.1197 21.3097 18.4873 20.6783 18.4873 19.8983C18.4873 19.1202 19.1197 18.4878 19.8987 18.4878Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Kullanıcı Arat</span></a></li>

                                                                     <li class="sidebar-list"><a class="sidebar-link sidebar-title link-nav" href="/admin/searchserver">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g> 
                          <g> 
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M11.2753 2.71436C16.0029 2.71436 19.8363 6.54674 19.8363 11.2753C19.8363 16.0039 16.0029 19.8363 11.2753 19.8363C6.54674 19.8363 2.71436 16.0039 2.71436 11.2753C2.71436 6.54674 6.54674 2.71436 11.2753 2.71436Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M19.8987 18.4878C20.6778 18.4878 21.3092 19.1202 21.3092 19.8983C21.3092 20.6783 20.6778 21.3097 19.8987 21.3097C19.1197 21.3097 18.4873 20.6783 18.4873 19.8983C18.4873 19.1202 19.1197 18.4878 19.8987 18.4878Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Sunucu Arat</span></a></li>
                                                                                                      <li class="sidebar-list"><a class="sidebar-link sidebar-title link-nav" href="/admin/discord_dm">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g> 
                          <g> 
                            <path d="M13.3352 19.5078H19.7122" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M16.0578 4.85901V4.85901C14.7138 3.85101 12.8078 4.12301 11.7998 5.46601C11.7998 5.46601 6.78679 12.144 5.04779 14.461C3.30879 16.779 4.95379 19.651 4.95379 19.651C4.95379 19.651 8.19779 20.397 9.91179 18.112C11.6268 15.828 16.6638 9.11701 16.6638 9.11701C17.6718 7.77401 17.4008 5.86701 16.0578 4.85901Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path d="M10.5042 7.21143L15.3682 10.8624" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Discord DM</span></a></li>  
                                                                                                                            <li class="sidebar-list"><a class="sidebar-link sidebar-title link-nav" href="/admin/eposta">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g> 
                          <g> 
                            <path d="M17.5449 9.01904C17.5449 9.01904 14.3349 12.8717 11.987 12.8717C9.64016 12.8717 6.39404 9.01904 6.39404 9.01904" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M2.45215 11.9688C2.45215 5.13075 4.8331 2.85205 11.976 2.85205C19.1188 2.85205 21.4998 5.13075 21.4998 11.9688C21.4998 18.8059 19.1188 21.0856 11.976 21.0856C4.8331 21.0856 2.45215 18.8059 2.45215 11.9688Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Mail Gönderici</span></a></li>  
                      
                  <li class="sidebar-list"><a class="sidebar-link sidebar-title link-nav" href="support-ticket.html">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g> 
                          <g>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M21.4399 13.9939C18.7789 13.9939 18.7789 9.87952 21.4399 9.87952C21.4399 5.11236 21.4399 3.41089 12.0449 3.41089C2.6499 3.41089 2.6499 5.11236 2.6499 9.87952C5.3109 9.87952 5.3109 13.9939 2.6499 13.9939C2.6499 18.762 2.6499 20.4635 12.0449 20.4635C21.4399 20.4635 21.4399 18.762 21.4399 13.9939Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0449 9.17114C11.3619 9.17114 11.2969 10.2606 10.8909 10.6462C10.4839 11.0308 9.22087 10.5912 9.04487 11.2743C8.86987 11.9583 10.0069 12.1904 10.1479 12.7768C10.2879 13.3632 9.59387 14.1875 10.1869 14.5986C10.7809 15.0079 11.4199 14.0804 12.0449 14.0804C12.6699 14.0804 13.3089 15.0079 13.9029 14.5986C14.4969 14.1875 13.8019 13.3632 13.9419 12.7768C14.0829 12.1904 15.2199 11.9583 15.0449 11.2743C14.8689 10.5912 13.6059 11.0308 13.1989 10.6462C12.7929 10.2606 12.7279 9.17114 12.0449 9.17114Z" stroke="#130F26" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </g>
                      </svg><span>Destek Talepleri</span></a></li>
                </ul>

              </div>
              <div class="right-arrow" id="right-arrow"><i data-feather="arrow-right"></i></div>
            </nav>
          </div>
        </div>`
     return adminnav;
}