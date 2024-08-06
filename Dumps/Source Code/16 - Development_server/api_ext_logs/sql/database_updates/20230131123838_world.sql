-- Make non-tameabale. Should not be beast npc 49005.
update creature_template set beast_family = 0, type = 7, type_flags = 0 where entry = 49005;

