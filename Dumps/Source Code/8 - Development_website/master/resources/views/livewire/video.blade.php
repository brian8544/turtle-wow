<div class="container-lg pt-5 pb-5">

    <div class="row p-5">

                <div class="col-lg-12 mb-3">
                    <h2 class="orange-text mb-5 hand" onclick="window.location='{{ route('watch') }}'">Turtle TV</h2>
                    <p class="text-gray2">Turtle WoW is always looking to expand the Warcraft universe, be it with
                        soundtracks, custom zones, or even dungeons!<Br>Our trailers and media for everything we do can be
                        found here.</p>
                </div>

                <div class="col-lg-12">

                    <div class="row">

                        <div class="col-lg-9">
                            @livewire('video-embed', ['id' => $id, 'thumb' => $thumb])

                            <div class="row">
                                <div class="col-lg-8 pt-4">
                                    <h3 class="orange-text mb-1">{{ $title }}</h3>
                                </div>
                                <div class="col-lg-1"></div>
                                <div class="col-lg-2 pt-4 mt-1 text-white text-right d-flex justify-content-end">
                                    <div data-toggle="tooltip" data-placement="top" title="Like" tooltip
                                         class="hand d-flex align-items-baseline" ng-click="like(1)">
                                        @if ((!$liked && !$disliked) || $disliked)
                                            <i class="fa-regular fa-thumbs-up mr-1"></i>
                                        @endif
                                        @if ($liked)
                                            <i class="fa-solid fa-thumbs-up"></i>
                                        @endif
                                        {{ $likes }}
                                    </div>
                                    <span class="ml-2 mr-2 text-gray2">|</span>
                                    <div data-toggle="tooltip" data-placement="top" title="Dislike" tooltip
                                         class="hand d-flex align-items-baseline" ng-click="like(-1)">
                                        @if ((!$liked && !$disliked) || $liked)
                                            <i class="fa-regular fa-thumbs-down mr-1"></i>
                                        @endif
                                        @if ($disliked)
                                            <i class="fa-solid fa-thumbs-down"></i>
                                        @endif
                                        {{ $dislikes }}
                                    </div>
                                </div>
                                <div class="col-lg-1 pt-4 mt-1 text-white text-right">
                                    <div data-toggle="tooltip" data-placement="top" title="Views" tooltip>
                                        <i class="fa fa-eye"></i>
                                        {{ $views }}
                                    </div>
                                </div>
                                <!--                        <div class="col-lg-1 pt-4 mt-1 text-white text-right">-->
                                <!--                           <ng-container data-toggle="tooltip" data-placement="top" title="Download" tooltip-->
                                <!--                                         class="hand">-->
                                <!--                              <a href="download.php?file=currentVideo.url" target="_blank" class="text-white">-->
                                <!--                                 <i class="fa fa-fw fa-download"></i> currentVideo.downloads</a>-->
                                <!--                           </ng-container>-->
                                <!--                        </div>-->
                            </div>


                            {{--<div class="comments text-white">
                                <small class="mb-3">
                                    <i class="fa fa-fw fa-comments"></i>

                                    <div>@if ($commentsCount == 1) 1 Comment @else {{ $commentsCount }} Comments @endif</div>

                                    <span class="ml-2 mr-2 text-gray2">|</span>

                                    <span class="hand text-gray" ng-click="toAddComment()"
                                          ng-class="{'text-white' : addingComment}"> <i class="fa fa-fw fa-pencil"></i> Add a comment
                                    </span>
                                </small>
                                <div ng-if="addingComment" class="text-right mt-2 pt-3">
                                    <form>
                                        <small class="float-left ml-1">Commenting as <strong>char</strong>.
                                            <span class="text-gray hand" ng-click="changeChar(0)"
                                                  ng-if="!selectingChar">(change)</span>
                                            <span ng-if="selectingChar">
                                    Select a character:
                                    <span ng-repeat="char in chars" ng-click="changeChar(char.name)"
                                          class="hand text-gray game-class-char.class">char.name </span>
                                 </span>
                                        </small>
                                        <input type="text" class="form-control" name="comment"
                                               placeholder="Comment..." id="comment"
                                               enter-submit="addComment(comment)"
                                               ng-disabled="working"
                                               ng-model="comment">
                                    </form>

                                    <small class="mr-2 float-left text-warning" ng-show="commentLimit">You can only comment once
                                        every 5 minutes.</small>
                                    <small class="mr-2 float-left text-warning" ng-show="commentLevel">
                                        You need to have at least one character above level 15 to comment.
                                    </small>
                                    <small class="hand text-gray mr-2" ng-click="cancelAddComment()">Cancel</small>
                                    <small class="hand orange-text mr-1" ng-click="addComment(comment)">Comment</small>
                                </div>
                                @if ($commentsCount == 0)
                                    <div class="text-center mt-5 text-gray2">
                                        No comments yet. Be the first to <span class="text-gray hand" ng-click="toAddComment()">add a comment</span>!
                                    </div>
                                @endif

                                @forelse($comments as $comment)
                                    <div class="comment pb-1 mt-3 pt-3 avatar-c.class" style="border-2top: 1px solid rgba(158, 151, 131, .1)">


                                        <span class="orange-text">{{ $comment['character'] }}</span>
                                        <small class="text-gray2">{{ $comment['created_at'] }}</small>

                                        <small class="text-green hand deleteComment" ng-if="c.mine && c.confirmation == -1"
                                               ng-click="editComment(c, 'open')">Edit</small>
                                        <small class="text-red hand deleteComment" ng-if="c.mine && c.confirmation == -1"
                                               ng-click="deleteComment(c, 0)">Delete</small>


                                        <ng-container ng-if="c.confirmation == 0">
                                            <small class="text-white">Delete this comment ? </small>
                                            <small class="text-red hand" ng-if="c.mine"
                                                   ng-click="deleteComment(c, 1)">Yes</small>
                                            <small class="text-gray hand" ng-if="c.mine"
                                                   ng-click="deleteComment(c, -1)">No</small>
                                        </ng-container>

                                        <div class="text-white mt-1 mb-1">
                                            <ng-container ng-show="!c.edit">c.comment</ng-container>
                                            <form ng-if="c.edit" class="text-right">
                                                <small class="float-left ml-1">Commenting as <strong>char</strong>.
                                                    <span class="text-gray hand" ng-click="changeChar(0)"
                                                          ng-if="!selectingChar">(change)</span>
                                                    <span ng-if="selectingChar">
                                    Select a character:
                                    <span ng-repeat="char in chars" ng-click="changeChar(char.name)"
                                          class="hand text-gray game-class-char.class">char.name </span>
                                 </span>
                                                </small>
                                                <input ng-model="c.comment" class="form-control"
                                                       enter-submit="editComment(c, 'save')" name="edit-c.id" id="edit-c.id">
                                                <small class="hand text-gray mr-2" ng-click="cancelEditComment(c)">Cancel</small>
                                                <small class="hand text-green mr-1" ng-click="editComment(c, 'save')">Save</small>
                                            </form>
                                        </div>

                                        <small class="text-gray hand" ng-click="showReplies(c)"
                                               ng-class="{'text-white' : c.showReplies}" ng-if="c.repliesCount > 0">
                                            <i class="fa fa-fw fa-comment"></i>
                                            <ng-container ng-if="c.repliesCount == 1">1 Reply</ng-container>
                                            <ng-container ng-if="c.repliesCount != 1">c.repliesCount Replies</ng-container>

                                        </small>

                                        <small class="text-gray2 ml-2 mr-2" ng-if="c.repliesCount > 0">|</small>

                                        <small class="text-gray hand" ng-click="toReply(c)"
                                               ng-class="{'text-white' : c.addingReply}">
                                            <i class="fa fa-fw fa-reply"></i> Reply
                                        </small>

                                        <div class="pt-4 text-right" ng-if="c.addingReply">
                                            <form>
                                                <small class="float-left">Replying as <strong>char</strong>.
                                                    <span class="text-gray hand" ng-click="changeChar(0)" ng-if="!selectingChar">(change)</span>
                                                    <span ng-if="selectingChar">
                                    Select a character:
                                    <span ng-repeat="char in chars" ng-click="changeChar(char.name)"
                                          class="hand text-gray game-class-char.class">char.name </span>
                                 </span>
                                                </small>
                                                <input type="text" class="form-control" placeholder="Reply..." id="reply-c.id"
                                                       enter-submit="addReply(c)"
                                                       name="reply-c.id" ng-model="c.reply">
                                            </form>

                                            <small class="mr-2 float-left text-warning" ng-show="c.replyLimit">You can only reply once
                                                every 5 minutes.</small>
                                            <small class="mr-2 float-left text-warning" ng-show="c.replyLevel">
                                                You need to have at least one character above level 15 to comment.
                                            </small>

                                            <small class="hand text-gray mr-2" ng-click="cancelAddReply(c)">Cancel</small>
                                            <small class="hand orange-text mr-1" ng-click="addReply(c)">Reply</small>
                                        </div>

                                        <div ng-if="c.showReplies" class="pt-2 pr-2 mt-1">

                                            <div class="more text-center" ng-if="c.showPreviousReplies">
                                                <small class="text-gray hand" ng-click="showPreviousReplies(c, c.replies[0].id)">Load
                                                    previous
                                                    replies</small>
                                            </div>

                                            <div ng-repeat="r in c.replies" class="reply pb-2 mt-2 pt-2 avatar-r.class"
                                                 style="border-top2: 1px solid rgba(158, 151, 131, .1)">
                                                <span class="orange-text">r.char</span>
                                                <small class="text-gray2">&nbsp;r.stamp</small>

                                                <small class="text-green hand deleteReply" ng-if="r.mine && r.confirmation == -1"
                                                       ng-click="editReply(r, 'open')">Edit</small>
                                                <small class="text-red hand deleteReply" ng-if="r.mine && r.confirmation == -1"
                                                       ng-click="deleteReply(r, c, 0)">Delete</small>

                                                <ng-container ng-if="r.confirmation == 0">
                                                    <small class="text-white">Delete this reply ? </small>
                                                    <small class="text-red hand" ng-if="r.mine"
                                                           ng-click="deleteReply(r, c, 1)">Yes</small>
                                                    <small class="text-gray hand" ng-if="r.mine"
                                                           ng-click="deleteReply(r, c, -1)">No</small>
                                                </ng-container>

                                                <div class="text-white mt-1">
                                                    <ng-container ng-show="!r.edit">r.reply</ng-container>
                                                    <form ng-if="r.edit" class="text-right">
                                                        <small class="float-left ml-1">Replying as <strong>char</strong>.
                                                            <span class="text-gray hand" ng-click="changeChar(0)"
                                                                  ng-if="!selectingChar">(change)</span>
                                                            <span ng-if="selectingChar">
                                          Select a character:
                                          <span ng-repeat="char in chars" ng-click="changeChar(char.name)"
                                                class="hand text-gray game-class-char.class">char.name </span>
                                           </span>
                                                        </small>
                                                        <input ng-model="r.reply" class="form-control"
                                                               enter-submit="editReply(r, 'save')" name="editReply-r.id"
                                                               id="editReply-r.id">
                                                        <small class="hand text-gray mr-2" ng-click="cancelEditReply(r)">Cancel</small>
                                                        <small class="hand text-green mr-1"
                                                               ng-click="editReply(r, 'save')">Save</small>
                                                    </form>
                                                </div>

                                            </div>

                                            <div class="more text-center" ng-if="c.showMoreReplies">
                                                <small class="text-gray hand" ng-click="showReplies(c, lidReplies)">Load more
                                                    replies</small>
                                            </div>

                                        </div>

                                    </div>
                                @empty
                                @endforelse

                                <div class="more text-center" ng-if="showMore">
                                    <small class="text-gray hand" ng-click="getComments(lid)">Load more comments</small>
                                </div>

                            </div>--}}
                        </div>

                        <div class="col-lg-3">

                            <div class="row">
                                @forelse($otherVideos as $otherVideo)
                                    @if ($loop->index == 16)
                                        @break
                                    @endif
                                    @livewire('video-thumb', ['thumb' => $otherVideo['thumb'], 'title' => $otherVideo['title'], 'views' => $otherVideo['views'], 'comments' => $otherVideo['comments'], 'duration' => $otherVideo['duration'], 'url' => $otherVideo['url'], 'vertical' => true])
                                @empty
                                @endforelse
                            </div>

                        </div>

                    </div>
                </div>

            </div>

</div>
