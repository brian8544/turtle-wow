angular.module('ucp', ['ui.bootstrap'])
    .controller('UcpCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            $('html, body').animate({
                scrollTop: 0
            }, 'slow');

            $scope.emailChange = {
                old: '',
                new: '',
                result: '',
                done: false
            }

            $scope.rank = localStorage.getItem('rank');

            $scope.shop_logs = [];
            $scope.shop_coins_history = [];
            $scope.logsPage = 1;
            $scope.historyPage = 1;
            $scope.logsLimit = 10;
            $scope.historyLimit = 10;
            $scope.total_logs_pages = 0;
            $scope.total_pages_shop_coins = 0;

            $scope.pageChanged = function(logsPage, historyPage) {
                $scope.logsPage = logsPage;
                $scope.historyPage = historyPage;
                $scope.get_history_shop();
            };


            $scope.get_history_shop = function () {
                http.post({
                    m: 'ucp',
                    w: 'get_history_shop',
                    p: {
                        logsPage: $scope.logsPage,
                        logsLimit: $scope.logsLimit,
                        historyPage: $scope.historyPage,
                        historyLimit: $scope.historyLimit
                    }
                }).then(function (data) {
                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.shop_logs = data.data.result.shop_logs;
                    $scope.shop_coins_history = data.data.result.shop_coins_history;
                    $scope.logsPage = data.data.result.current_logs_page;
                    $scope.historyPage = data.data.result.current_history_page;
                    $scope.total_logs_pages = data.data.result.total_logs_pages;
                    $scope.total_pages_shop_coins = data.data.result.total_pages_shop_coins;

                    $scope.total_logs_items = $scope.total_logs_pages * $scope.logsLimit;
                    $scope.total_coins = $scope.total_pages_shop_coins * $scope.historyLimit;

                });
            }

            // unstuck
            $scope.unstuck_characters = [];
            $scope.unstuck = {
                character: '0',
            }

            $scope.unstucking = false;
            $scope.unstuck_complete = false;
            $scope.unstuck_result = '';

            $scope.get_unstuck_characters = function () {
                http.post({
                    m: 'ucp',
                    w: 'get_unstuck_list',
                    p: {}
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.unstuck_characters = data.data.result;
                });
            }


            $scope.unstuck_eligible_status = function (guid) {
                var status = -1;
                var cooldown = -1;

                angular.forEach($scope.unstuck_characters, function (va, ke) {
                    if (va.guid == guid) {
                        status = 0;
                        cooldown = 0;
                        if (va.online == 1)
                            status = 1;
                        if (va.cd != 0) {
                            status = 2;
                            cooldown = va.cd;
                        }
                    }
                });

                return {
                    status: status,
                    cooldown: cooldown
                }
            }

            $scope.unstuck_do = function (guid) {
                $scope.unstucking = true;
                http.post({
                    m: 'ucp',
                    w: 'unstuck',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.unstucking = false;
                    if (data.data.result.err) {
                        $scope.unstuck_complete = false
                    } else {
                        $scope.unstuck_complete = true;
                    }
                    $scope.unstuck_result = data.data.result.details;
                });
            }

            if (typeof $stateParams.token !== 'undefined') {
                $scope.view = 'email-changed';
                $scope.emailChange.result = '';
                http.post({
                    m: 'ucp',
                    w: 'activateNewEmail',
                    p: {
                        token: $stateParams.token,
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.emailChange.result = data.data.result.details;

                });
            } else {
                $scope.view = $stateParams.route;
                if ($scope.view == 'services') {
                    $scope.get_unstuck_characters();
                }
                if ($scope.view == 'history_shop') {
                    $scope.get_history_shop();
                }
            }


            $scope.data = {};

            $scope.getUCP = function() {

                http.post({
                    m: 'ucp',
                    w: 'get',
                    p: {
                        view: $scope.view
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    if ($scope.view == 'overview')
                        angular.forEach(data.data.result.status.messages, function (v, k) {
                            v.m = $sce.trustAsHtml(v.message);
                        });

                    $scope.data = data.data.result;
                });

            }

            $scope.getUCP();

            // email change

            $scope.toggleEmailChangeModal = function () {
                $scope.emailChange = {
                    old: '',
                    new: '',
                    result: '',
                    done: false
                }
                $('#emailChange').modal('toggle')
            }

            $scope.appeal = {
                message: '',
                err: ''
            }
            $scope.toggleBanAppealModal = function () {
                $scope.appeal = {
                    message: '',
                    err: ''
                }

                http.post({
                    m: 'ucp',
                    w: 'mark_read',
                    p: {}
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                });

                $('#banAppeal').modal('toggle');

                $timeout(function () {
                    $("#messageHistory").animate({scrollTop: $('#messageHistory').prop("scrollHeight")}, 100);
                }, 500);
            }

            $scope.sendAppeal = function () {
                http.post({
                    m: 'ucp',
                    w: 'add_appeal',
                    p: {
                        message: $scope.appeal.message
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.appeal.err = data.data.result.details

                    if (!data.data.result.err) {
                        $scope.appeal.message = '';
                        http.post({
                            m: 'ucp',
                            w: 'get',
                            p: {
                                view: $scope.view
                            }
                        }).then(function (data) {

                            if (data.data.result.details && data.data.result.details == 'Not logged in.')
                                $scope.logout();

                            if ($scope.view == 'overview')
                                angular.forEach(data.data.result.status.messages, function (v, k) {
                                    v.m = $sce.trustAsHtml(v.message);
                                });

                            $scope.data = data.data.result;

                            $timeout(function () {
                                $("#messageHistory").animate({scrollTop: $('#messageHistory').prop("scrollHeight")}, 100);
                            }, 500);

                        });
                    }
                });
            }

            $scope.changeEmailAddress = function () {

                if (!$scope.emailChange.old) {
                    $scope.emailChange.result = 'Invalid old email address';
                    return;
                }
                if (!$scope.emailChange.new) {
                    $scope.emailChange.result = 'Invalid new email address';
                    return;
                }

                if ($scope.emailChange.old.length === 0 || $scope.emailChange.new.length === 0) {
                    $scope.emailChange.result = 'Email address can\'t be empty';
                    return;
                }

                if ($scope.emailChange.old === $scope.emailChange.new) {
                    $scope.emailChange.result = 'New and old addresses cannot be the same.';
                    return;
                }

                http.post({
                    m: 'ucp',
                    w: 'changeEmail',
                    p: {
                        old: $scope.emailChange.old,
                        new: $scope.emailChange.new,
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.emailChange.result = data.data.result.details;
                    $scope.emailChange.done = !data.data.result.err;

                });
            }

            $scope.transfer_complete = false;
            $scope.confirmation_checked = false;

            $scope.transfer_account = {
                needNewAccount: false,
                banned: false,
                online: false,
                in_progress: false,
                account_name: '',
                user_password: '',
                user_password2: '',
                realm_id: '0'
            }

            $scope.character_queue_status = [];

            $scope.realm_lists = [
                {
                    id: 2,
                    realmName: 'Ravenshire'
                },
                {
                    id: 3,
                    realmName: 'Emerald Dream'
                }
            ];

            $scope.transfer_err = false;

            $scope.toggleTransferAccountModal = function (toggle) {
                http.post({
                    m: 'ucp',
                    w: 'checkTransferStatus',
                }).then(function (data) {
                    data = data.data.result;
                    

                    if (data.in_progress) {
                        $scope.transfer_account.in_progress = data.in_progress;
                    }
                    if (data.transfer_complete) {
                        $scope.transfer_complete = data.transfer_complete;
                    }
                    if (data.characters) {
                        $scope.character_queue_status = data.characters;
                    }
                    if (data.banned) {
                        $scope.transfer_account.banned = data.banned;
                    }
                    if (data.online) {
                        $scope.transfer_account.online = data.online;
                    }
                    if (data.username_exists) {
                        $scope.transfer_account.needNewAccount = data.username_exists;
                    }
                    if (data.error) {
                        $scope.transfer_err = data.error;
                    }
                });

                if (toggle) {
                    $('#transferAccount').modal('toggle');
                }
            }

            $scope.transferAccount = function () {
                if ($scope.transfer_account.needNewAccount) {
                    if ($scope.transfer_account.account_name <= 2 ||
                        $scope.transfer_account.user_password <= 2 ||
                        $scope.transfer_account.user_password2 <= 2 ||
                        $scope.transfer_account.user_password != $scope.transfer_account.user_password2) {
                        $scope.transfer_err = true;
                        return;
                    }
                }

                http.post({
                    m: 'ucp',
                    w: 'transferAccount',
                    p: {
                        data: $scope.transfer_account
                    }
                }).then(function (data) {
                    if (data.data.result.response.username) {
                        $scope.response = data.data.result.response.username;
                    } else {
                        $scope.response = data.data.result.response;
                    }
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }

                    if ($scope.response.indexOf('Successfully added') !== -1) {
                        $scope.transfer_account.in_progress = true;
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }

            $scope.beginTransferCharacter = function (guid) {
                $scope.transfer_err = false;
                $scope.response = '';

                http.post({
                    m: 'ucp',
                    w: 'beginTransferCharacter',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }
                    if (data.data.result.response) {
                        $scope.response = data.data.result.response;
                    }

                    if (!$scope.transfer_err) {
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }

            $scope.completeTransferCharacter = function (guid) {
                $scope.transfer_err = false;
                $scope.response = '';

                http.post({
                    m: 'ucp',
                    w: 'completeTransferCharacter',
                    p: {
                        guid: guid
                    }
                }).then(function (data) {
                    if (data.data.result.error) {
                        $scope.transfer_err = data.data.result.error;
                    }
                    if (data.data.result.response) {
                        $scope.response = data.data.result.response;
                    }

                    if (data.data.result.transferComplete) {
                        $scope.logout(true);
                    }

                    if (!$scope.transfer_err) {
                        $scope.toggleTransferAccountModal(false);
                    }
                });
            }


            // delete account
            $scope.delete_account = {
                checkbox: false,
                email: '',
                password: '',
                result: ''
            }
            $scope.toggleDeleteAccountModal = function () {
                $scope.delete_account = {
                    checkbox: false,
                    email: '',
                    password: '',
                    result: ''
                }
                $('#deleteAccount').modal('toggle');
            }
            $scope.delete_account_checkbox_toggle = function () {
                $scope.delete_account.checkbox = !$scope.delete_account.checkbox;
            }
            $scope.deleteAccount = function () {
                http.post({
                    m: 'ucp',
                    w: 'deleteAccount',
                    p: {
                        email: $scope.delete_account.email,
                        password: $scope.delete_account.password
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    if (data.data.result.err) {
                        $scope.delete_account.result = data.data.result.details;
                    } else {
                        $('#deleteAccount').modal('toggle');
                        $timeout(function () {
                            $scope.logout();
                        }, 750);
                    }
                });
            }


            var update_email_sub_timer;

            // newsletter
            $scope.toggleEmailSub = function () {
                if ($scope.data.email_sub === 1)
                    $scope.data.email_sub = 0;
                else
                    $scope.data.email_sub = 1;

                $timeout.cancel(update_email_sub_timer);

                update_email_sub_timer = $timeout(function () {
                    http.post({
                        m: 'ucp',
                        w: 'setEmailSub',
                        p: {
                            to: $scope.data.email_sub
                        }
                    }).then(function (data) {

                        if (data.data.result.details && data.data.result.details == 'Not logged in.')
                            $scope.logout();

                    });
                }, 1000)

            }

            $scope.security = {
                c_password: '',
                n_password: '',
                n_password2: '',
                pw_change_result: ''
            }

            $scope.change_password = function () {

                if ($scope.passwords_valid()) {

                    http.post({
                        m: 'ucp',
                        w: 'change_password',
                        p: {
                            data: $scope.security
                        }
                    }).then(function (data) {

                        if (data.data.result.details && data.data.result.details == 'Not logged in.')
                            $scope.logout();

                        if (data.data.result.err) {

                        } else {
                            $scope.security = {
                                c_password: '',
                                n_password: '',
                                n_password2: ''
                            }
                        }

                        $scope.security.pw_change_result = data.data.result.details;

                    });
                }

            }

            $scope.passwords_valid = function () {
                if ($scope.security.c_password == '' || $scope.security.n_password == ''
                    || $scope.security.n_password == '')
                    return false;

                if ($scope.security.n_password != '' && $scope.security.n_password != $scope.security.n_password2)
                    return false;

                return /^[\dA-Za-z!?%*$\-+]{4,16}$/.test($scope.security.n_password);
            }

            $scope.pw_valid = function(pw) {
                if (pw == '')
                    return true;
                return /^[\dA-Za-z!?%*$\-+]{4,16}$/.test(pw);
            }

            $scope.restore_result = 'Character restored';
            $scope.restoreCharacter = function(name) {

                http.post({
                    m: 'ucp',
                    w: 'restoreCharacter',
                    p: {
                        name: name
                    }
                }).then(function (data) {

                    if (data.data.result.details && data.data.result.details == 'Not logged in.')
                        $scope.logout();

                    $scope.restore_result = data.data.result.details;

                    if (data.data.result.err) {
                    } else {
                        $scope.getUCP();
                    }

                });

            }

        }])
;