delete from mangos_string where entry between 50000 and 50006;
delete from autobroadcast where string_id between 50000 and 50006;

replace into mangos_string (entry, content_default, content_loc4) values

('50000', 'Delete your WDB folder regularly. This is your game cache, and deleting it can often fix minor game glitches. Always try this before submitting a ticket.', '定期删除WDB文件夹。这是游戏缓存，删除它通常可以修复一些小的游戏故障。在提交工单之前，请务必尝试此方法。'),

('50001', 'Love is in the air! To show our love, our in-game shop will be hosting a sale starting February 2nd, lasting until February 16th! There may be some limited time items... so grab them while you can!', '如果您想鼓励我们的项目，请查看我们的商店以获取捐赠奖励！请在我们网站的捐赠页面上了解更多信息。'),

('50002', 'Keep up to date with the news and join our Discord server!', '保持与最新消息的同步，并加入我们的KOOK服务器！'),

('50003', 'We encourage everyone to change their password regularly. If you think you have ever used your Turtle WoW password in different private servers we urge you to change it as soon as possible.', '我们鼓励每个人定期更改密码。如果您认为您曾在其他私人服务器上使用过乌龟魔兽的密码，请尽快更改密码。'),

('50004', 'All gold transactions are heavily monitored. Any form of RMT will result in severe actions taken against all parties involved. Please, don''t support individuals who are actively harming our server.', '所有金币交易都受到严格监控。任何形式的RMT交易将对所有涉及方采取严厉行动。请不要支持那些正在损害我们服务器的个人。'),

('50005', 'Tune in to Everlook Broadcasting Co. Radio to delve into Azeroth''s rich lore, enjoy its finest melodies, and stay updated on the products you never knew you needed!', '收听永望广播公司收音机，深入了解艾泽拉斯丰富的故事，欣赏最美妙的旋律，并及时了解你以前不知道需要的产品！');

replace into autobroadcast (string_Id) values (50000),(50001),(50002),(50003),(50004),(50005);
