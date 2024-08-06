delete from mangos_string where entry between 50000 and 50005;
delete from autobroadcast where string_id between 50000 and 50005;

replace into mangos_string (entry, content_default) values 

('50000', 'Delete your WDB folder regularly. This is your game cache, and deleting it can often fix minor game glitches. Always try this before submitting a ticket.'),

('50001', 'If you want to help our project, check our shop for donation rewards! Visit the donation page on our website for more info.'),

('50002', '/join world to connect with the community around you!'),

('50003', 'Keep up to date with the news and join our Discord server!');

replace into autobroadcast (string_Id) values ('50000'),('50001'),('50002'),('50003');
