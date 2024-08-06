angular.module('watch', [])
    .controller('WatchCtrl', ['$scope', '$location', 'http', '$sce', '$stateParams', '$timeout',
        function ($scope, $location, http, $sce, $stateParams, $timeout) {

            // $('html, body').animate({
            //     scrollTop: 0
            // }, 'slow');

            var prevScrollPos = window.scrollY;
            window.onscroll = function() {
                var currentScrollPos = window.scrollY;
                if (prevScrollPos > currentScrollPos) {
                    document.getElementById("main-navbar").style.top = "0";
                } else {
                    document.getElementById("main-navbar").style.top = "-80px";
                }
                prevScrollPos = currentScrollPos;
            }

            $scope.view = 'all';
            $scope.searchQuery = '';
            $scope.comment = '';
            $scope.reply = '';
            $scope.currentVideo = [];

            $scope.lid = 0;
            $scope.lidReplies = 0;

            $scope.showMore = true;

            $scope.chars = [];
            $scope.char = localStorage.getItem('postingChar');

            $scope.moderation = [];

            $scope.getComments = function (lid) {
                var clearComments = false;
                if (typeof lid === 'undefined') {
                    lid = 2147483647;
                    //$scope.currentVideo.comments = [];
                    clearComments = true;
                }

                $scope.comment = '';

                http.post({
                    m: 'video',
                    w: 'getComments',
                    p: {
                        id: $scope.id,
                        lid: lid
                    }
                }).then(function (data) {
                    if (clearComments)
                        $scope.currentVideo.comments = [];

                    angular.forEach(data.data.result.comments, function (va, ke) {
                        va.showReplies = false;
                        va.confirmation = -1;
                        $scope.lid = va.id;
                        $scope.currentVideo.comments.push(va)
                    });
                    $scope.currentVideo.commentsCount = data.data.result.commentsCount;
                    $scope.showMore = data.data.result.commentsCount > $scope.currentVideo.comments.length;
                });
            }

            $scope.getLikes = function () {
                http.post({
                    m: 'video',
                    w: 'likes',
                    p: {
                        id: $scope.id
                    }
                }).then(function (data) {
                    $scope.likes = data.data.result;
                });
            }

            $scope.getViews = function (id) {
                http.post({
                    m: 'video',
                    w: 'getViews',
                    p: {
                        id: id
                    }
                }).then(function (data) {
                    $scope.currentVideo.views = data.data.result;
                });
            }

            $scope.nothing = true;

            $scope.filterChannels = function () {

                $scope.channels = $scope.getChannels();

                $scope.id = $stateParams['id'];

                $scope.view = '';
                $scope.currentChannel = [];
                $scope.currentVideo = [];
                $scope.otherVideos = [];

                if ($location.$$path.indexOf('watch') !== -1 && $location.$$path.indexOf('watch/') === -1) {
                    $scope.view = 'all';
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }


                if ($location.$$path.indexOf('channel') !== -1) {
                    $scope.view = 'channel';
                    angular.forEach($scope.channels, function (va, ke) {
                        if ($scope.id == va.name_slug)
                            $scope.currentChannel = va;
                    });
                    $('html, body').animate({
                        scrollTop: 0
                    }, 'slow');
                }

                if ($location.$$path.indexOf('watch/') !== -1 && $location.$$path.indexOf('watch/channel') === -1) {
                    $scope.view = 'video';
                    $scope.channel = '';
                    angular.forEach($scope.channels, function (va, ke) {
                        angular.forEach(va.videos, function (va2, ke2) {
                            if (va2.id == $scope.id) {

                                $scope.getViews($scope.id);
                                $scope.getComments();
                                $scope.getLikes();

                                $scope.currentVideo = va2;
                                $scope.channel = va.name;
                            }
                        });
                    });
                    angular.forEach($scope.channels, function (va, ke) {
                        if (va.name == $scope.channel) {
                            angular.forEach(va.videos, function (va2, ke2) {
                                if (va2.id !== $scope.currentVideo.id)
                                    $scope.otherVideos.push(va2);
                            });
                        }
                    });
                    $('html, body').animate({
                        scrollTop: 245
                    }, 'slow');
                }

                if ($location.$$path.indexOf('moderation') !== -1) {
                    $scope.view = 'moderation';
                    $scope.nothing = true;

                    http.post({
                        m: 'video',
                        w: 'commentsAdmin'
                    }).then(function (data) {
                        if (data.data.result.nothing === 'here') {
                            $scope.nothing = true;
                            return;
                        }
                        $scope.nothing = false;
                        $scope.moderation = data.data.result;
                    });
                }
            }

            $scope.moderate = function (id, i) {
                http.post({
                    m: 'video',
                    w: 'moderate',
                    p: {
                        id: id,
                        i: i
                    }
                }).then(function (data) {
                    if (data.data.result.moderated == 'ok')
                        angular.forEach($scope.moderation, function (va, ke) {
                            if (va.id === id)
                                $scope.moderation.splice(ke, 1);
                        })
                });
            }

            $scope.initVideos = function () {
                if ($scope.channelsNum() === 0) {

                    http.post({
                        m: 'video',
                        w: 'get'
                    }).then(function (data) {
                        $scope.setChannels(data.data.result);
                        $scope.filterChannels();
                    });

                } else {
                    $scope.filterChannels();
                }
            }

            $scope.initVideos();

            $scope.$on('initVideos', function (event, args) {
                $scope.setChannels([]);
                $scope.initVideos();
            });

            $scope.addingComment = false;
            $scope.commentLimit = false;
            $scope.commentLevel = false

            $scope.toAddComment = function () {
                if ($scope.addingComment) {
                    $scope.addingComment = false;
                    return
                }

                http.post({
                    m: 'video',
                    w: 'ci',
                    p: {}
                }).then(function (data) {
                    if (data.data.result.login) {
                        $scope.comment = '';
                        $scope.addingComment = true;
                        $timeout(function () {
                            document.getElementById('comment').focus();
                        }, 100);
                        $scope.getChars();
                    } else {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    }
                });

            }

            $scope.cancelAddComment = function () {
                $scope.comment = '';
                $scope.addingComment = false;
            }

            $scope.working = false;
            $scope.addComment = function (c) {
                if ($scope.working)
                    return;

                if (c.length > 0) {
                    $scope.commentLimit = false;
                    $scope.commentLevel = false;
                    $scope.working = true;
                    http.post({
                        m: 'video',
                        w: 'comment',
                        p: {
                            id: $scope.currentVideo.id,
                            comment: c,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        $scope.working = false;
                        if (data.data.result.limit) {
                            $scope.commentLimit = true;
                            return
                        }
                        if (data.data.result.minlvl15) {
                            $scope.commentLevel = true;
                            return
                        }
                        $scope.addingComment = false;
                        $scope.currentVideo.commentsCount = data.data.result.commentsCount;
                        data.data.result.comment.confirmation = -1;
                        $scope.currentVideo.comments.unshift(data.data.result.comment);
                    });
                }
            }


            $scope.showReplies = function (c, lid) {
                if (typeof lid == 'undefined') {
                    lid = 0;
                    if (typeof c.replies == 'undefined')
                        c.replies = [];
                }

                if (c.showReplies && lid === 0) {
                    c.showReplies = false;
                    return;
                }

                if (lid === 0 && c.replies.length > 0) {
                    c.showReplies = !c.showReplies;
                    return;
                }

                http.post({
                    m: 'video',
                    w: 'getReplies',
                    p: {
                        parent: c.id,
                        lid: lid
                    }
                }).then(function (data) {

                    angular.forEach(data.data.result.replies, function (va, ke) {
                        $scope.lidReplies = va.id
                        c.replies.push(va);
                        c.reply = '';
                        va.confirmation = -1;
                    });

                    c.showMoreReplies = data.data.result.repliesCount > c.replies.length;
                    c.showPreviousReplies = false;

                    c.showReplies = true;

                });
            }

            $scope.showPreviousReplies = function (c, lid) {
                http.post({
                    m: 'video',
                    w: 'getReplies',
                    p: {
                        parent: c.id,
                        lid: lid,
                        previous: true
                    }
                }).then(function (data) {
                    angular.forEach(data.data.result.replies, function (va, ke) {
                        va.confirmation = -1;
                        c.replies.unshift(va);
                    });
                    c.showPreviousReplies = c.repliesCount > c.replies.length;
                })
            }

            $scope.toReply = function (c) {
                $scope.reply = '';
                http.post({
                    m: 'video',
                    w: 'ci',
                    p: {}
                }).then(function (data) {
                    if (data.data.result.login) {
                        c.addingReply = !c.addingReply;
                        if (c.addingReply) {
                            $timeout(function () {
                                document.getElementById("reply-" + c.id).focus();
                            }, 100);
                            $scope.getChars();
                        }
                    } else {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    }
                });

            }

            $scope.cancelAddReply = function (c) {
                c.reply = '';
                c.addingReply = false;
            }

            $scope.addReply = function (c) {
                if ($scope.working)
                    return;
                if (c.reply.length > 0) {
                    c.replyLimit = false;
                    c.replyLevel = false;
                    $scope.working = true;
                    http.post({
                        m: 'video',
                        w: 'comment',
                        p: {
                            id: $scope.currentVideo.id,
                            parent: c.id,
                            comment: c.reply,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        $scope.working = false;
                        if (data.data.result.limit) {
                            c.replyLimit = true;
                            return
                        }
                        if (data.data.result.limit) {
                            c.replyLevel = true;
                            return
                        }
                        $scope.cancelAddReply(c);
                        angular.forEach(data.data.result.replies, function (va, ke) {
                            va.confirmation = -1
                        });

                        c.replies = data.data.result.replies;
                        c.repliesCount = data.data.result.repliesCount;
                        c.showMoreReplies = false;
                        c.showPreviousReplies = c.repliesCount > data.data.result.replies.length;
                        c.showReplies = true;
                    });
                }
            }

            $scope.like = function (l) {
                http.post({
                    m: 'video',
                    w: 'like',
                    p: {
                        id: $scope.id,
                        l: l
                    }
                }).then(function (data) {
                    if (data.data.result.login == 0) {
                        $scope.openLoginModal('watch/' + $scope.currentVideo.id);
                    } else {
                        $scope.getLikes();
                    }

                });
            }

            $scope.editComment = function (c, action) {
                if (action === 'open') {
                    c.edit = true;
                    c.originalComment = c.comment;
                    $timeout(function () {
                        document.getElementById("edit-" + c.id).focus();
                    }, 100);
                    if ($scope.chars.length === 0)
                        $scope.getChars();
                    return
                }
                if (action === 'save' && c.comment.length > 0) {
                    if (c.comment === c.originalComment && c.char === $scope.char) {
                        c.edit = false;
                        return
                    }
                    http.post({
                        m: 'video',
                        w: 'editComment',
                        p: {
                            id: c.id,
                            comment: c.comment,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        c.char = data.data.result.char;
                        c.class = data.data.result.class;
                        c.edit = false;
                    });
                }
            }

            $scope.editReply = function (r, action) {
                if (action === 'open') {
                    r.edit = true;
                    r.originalReply = r.reply;
                    $timeout(function () {
                        document.getElementById("editReply-" + r.id).focus();
                    }, 100);
                    if ($scope.chars.length === 0)
                        $scope.getChars();
                    return
                }
                if (action === 'save' && r.reply.length > 0) {
                    if (r.reply === r.originalReply && r.char === $scope.char) {
                        r.edit = false;
                        return
                    }
                    http.post({
                        m: 'video',
                        w: 'editComment',
                        p: {
                            id: r.id,
                            comment: r.reply,
                            char: $scope.char
                        }
                    }).then(function (data) {
                        r.char = data.data.result.char;
                        r.class = data.data.result.class;
                        r.edit = false;
                    });
                }
            }

            $scope.cancelEditComment = function (c) {
                c.edit = false;
                c.comment = c.originalComment;
            }

            $scope.cancelEditReply = function (r) {
                r.edit = false;
                r.reply = r.originalReply;
            }

            $scope.deleteComment = function (c, confirmation) {
                c.confirmation = confirmation;

                if (c.confirmation === 1) {

                    http.post({
                        m: 'video',
                        w: 'deleteComment',
                        p: {
                            id: c.id
                        }
                    }).then(function (data) {
                        angular.forEach($scope.currentVideo.comments, function (va, ke) {
                            if (va.id == c.id) {
                                $scope.currentVideo.comments.splice(ke, 1);
                                $scope.currentVideo.commentsCount--;
                            }
                        });
                        $scope.showMore = $scope.currentVideo.commentsCount > $scope.currentVideo.comments.length;
                    });
                }
            }

            $scope.deleteReply = function (reply, parent, confirmation) {
                reply.confirmation = confirmation;

                if (reply.confirmation === 1) {

                    http.post({
                        m: 'video',
                        w: 'deleteComment',
                        p: {
                            id: reply.id
                        }
                    }).then(function (data) {
                        angular.forEach(parent.replies, function (va, ke) {
                            if (va.id === reply.id) {
                                parent.replies.splice(ke, 1);
                                parent.repliesCount--;
                            }
                        });
                        if (parent.repliesCount == 0) {
                            parent.showMoreReplies = false;
                            parent.showReplies = false;
                        }
                    });
                }
            }

            $scope.selectingChar = false;

            $scope.changeChar = function (n) {
                if (n === 0) {
                    $scope.selectingChar = true;
                    return;
                }

                $scope.char = n;
                localStorage.setItem('postingChar', n);
                $scope.selectingChar = false;
            }

            $scope.getChars = function () {
                if ($scope.chars.length === 0) {
                    http.post({
                        m: 'video',
                        w: 'getChars',
                        p: {}
                    }).then(function (data) {
                        $scope.chars = data.data.result;
                        if ($scope.char === null) {
                            $scope.char = $scope.chars[0].name;
                            localStorage.setItem('postingChar', $scope.char);
                        }
                    });
                }
            }

        }])
;
