import {
	mysqlTable,
	text,
	smallint,
	float,
	varchar,
	tinyint,
	int,
	longtext,
	unique,
	index,
	char,
	timestamp,
	tinytext,
	mediumtext,
	datetime,
	mediumint,
	bigint
} from 'drizzle-orm/mysql-core';

export const areatrigger_bg_entrance = mysqlTable('areatrigger_bg_entrance', {
	id: mediumint('id').notNull(),
	name: text('name'),
	team: mediumint('team').notNull(),
	bg_template: mediumint('bg_template').notNull(),
	exit_map: smallint('exit_map').notNull(),
	exit_position_x: float('exit_position_x').notNull(),
	exit_position_y: float('exit_position_y').notNull(),
	exit_position_z: float('exit_position_z').notNull(),
	exit_orientation: float('exit_orientation').notNull()
});

export const areatrigger_involvedrelation = mysqlTable(
	'areatrigger_involvedrelation',
	{
		id: mediumint('id').notNull(),
		quest: mediumint('quest').notNull()
	}
);

export const areatrigger_tavern = mysqlTable('areatrigger_tavern', {
	id: mediumint('id').notNull(),
	name: text('name')
});

export const areatrigger_teleport = mysqlTable('areatrigger_teleport', {
	id: mediumint('id').notNull(),
	name: varchar('name', { length: 64 }).default('').notNull(),
	message: varchar('message', { length: 128 }).default('').notNull(),
	required_level: tinyint('required_level').default(0).notNull(),
	required_condition: mediumint('required_condition').notNull(),
	target_map: smallint('target_map').notNull(),
	target_position_x: float('target_position_x').notNull(),
	target_position_y: float('target_position_y').notNull(),
	target_position_z: float('target_position_z').notNull(),
	target_orientation: float('target_orientation').notNull()
});

export const areatrigger_template = mysqlTable('areatrigger_template', {
	id: smallint('id').notNull(),
	map_id: smallint('map_id').notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	radius: float('radius').notNull(),
	box_x: float('box_x').notNull(),
	box_y: float('box_y').notNull(),
	box_z: float('box_z').notNull(),
	box_orientation: float('box_orientation').notNull()
});

export const area_template = mysqlTable('area_template', {
	entry: mediumint('entry').notNull(),
	map_id: mediumint('map_id').notNull(),
	zone_id: mediumint('zone_id').notNull(),
	explore_flag: mediumint('explore_flag').notNull(),
	flags: mediumint('flags').notNull(),
	area_level: mediumint('area_level').notNull(),
	name: varchar('name', { length: 100 }).default('').notNull(),
	team: tinyint('team').default(0).notNull(),
	liquid_type: tinyint('liquid_type').default(0).notNull()
});

export const auctionhousebot = mysqlTable('auctionhousebot', {
	item: int('item').notNull(),
	stack: tinyint('stack').default(1).notNull(),
	bid: int('bid').default(1).notNull(),
	buyout: int('buyout').default(1).notNull()
});

export const autobroadcast = mysqlTable('autobroadcast', {
	string_id: int('string_id')
});

export const battleground_events = mysqlTable('battleground_events', {
	map: smallint('map').notNull(),
	event1: tinyint('event1').notNull(),
	event2: tinyint('event2').notNull(),
	description: varchar('description', { length: 255 }).notNull()
});

export const battleground_template = mysqlTable('battleground_template', {
	id: mediumint('id').notNull(),
	min_players_per_team: smallint('min_players_per_team').notNull(),
	max_players_per_team: smallint('max_players_per_team').notNull(),
	min_level: tinyint('min_level').default(0).notNull(),
	max_level: tinyint('max_level').default(0).notNull(),
	alliance_win_spell: smallint('alliance_win_spell').notNull(),
	alliance_lose_spell: smallint('alliance_lose_spell').notNull(),
	horde_win_spell: smallint('horde_win_spell').notNull(),
	horde_lose_spell: smallint('horde_lose_spell').notNull(),
	alliance_start_location: mediumint('alliance_start_location').notNull(),
	horde_start_location: mediumint('horde_start_location').notNull(),
	player_loot_id: mediumint('player_loot_id').notNull()
});

export const battlemaster_entry = mysqlTable('battlemaster_entry', {
	entry: mediumint('entry').notNull(),
	bg_template: mediumint('bg_template').notNull()
});

export const broadcast_text = mysqlTable('broadcast_text', {
	entry: mediumint('entry').notNull(),
	male_text: longtext('male_text'),
	female_text: longtext('female_text'),
	chat_type: tinyint('chat_type').default(0).notNull(),
	sound_id: smallint('sound_id').notNull(),
	language_id: tinyint('language_id').default(0).notNull(),
	emote_id1: smallint('emote_id1').notNull(),
	emote_id2: smallint('emote_id2').notNull(),
	emote_id3: smallint('emote_id3').notNull(),
	emote_delay1: mediumint('emote_delay1').notNull(),
	emote_delay2: mediumint('emote_delay2').notNull(),
	emote_delay3: mediumint('emote_delay3').notNull()
});

export const cinematic_waypoints = mysqlTable('cinematic_waypoints', {
	cinematic: int('cinematic').default(0),
	timer: int('timer').default(0),
	position_x: float('position_x'),
	position_y: float('position_y'),
	position_z: float('position_z'),
	comment: varchar('comment', { length: 255 }),
	id: int('id').autoincrement().notNull()
});

export const companion_spells = mysqlTable('companion_spells', {
	itemId: int('itemId').notNull(),
	spellId: int('spellId').notNull()
});

export const conditions = mysqlTable(
	'conditions',
	{
		condition_entry: mediumint('condition_entry').autoincrement().notNull(),
		type: tinyint('type').default(0).notNull(),
		value1: mediumint('value1').notNull(),
		value2: mediumint('value2').notNull(),
		value3: mediumint('value3').notNull(),
		value4: mediumint('value4').notNull(),
		flags: tinyint('flags').default(0).notNull()
	},
	table => ({
		unique_conditions: unique('unique_conditions').on(
			table.type,
			table.value1,
			table.value2,
			table.flags,
			table.value3,
			table.value4
		)
	})
);

export const creature = mysqlTable(
	'creature',
	{
		guid: int('guid').autoincrement().notNull(),
		id: mediumint('id').notNull(),
		id2: mediumint('id2').notNull(),
		id3: mediumint('id3').notNull(),
		id4: mediumint('id4').notNull(),
		map: smallint('map').notNull(),
		position_x: float('position_x').notNull(),
		position_y: float('position_y').notNull(),
		position_z: float('position_z').notNull(),
		orientation: float('orientation').notNull(),
		spawntimesecsmin: int('spawntimesecsmin').default(120).notNull(),
		spawntimesecsmax: int('spawntimesecsmax').default(120).notNull(),
		wander_distance: float('wander_distance').default(5).notNull(),
		health_percent: float('health_percent').default(100).notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("mana_percent").notNull(),
		movement_type: tinyint('movement_type').default(0).notNull(),
		spawn_flags: int('spawn_flags').default(0).notNull(),
		visibility_mod: float('visibility_mod')
	},
	table => ({
		idx_map: index('idx_map').on(table.map),
		idx_id: index('idx_id').on(table.id)
	})
);

export const creature_addon = mysqlTable('creature_addon', {
	guid: int('guid').default(0).notNull(),
	display_id: smallint('display_id').notNull(),
	mount_display_id: smallint('mount_display_id').default(-1).notNull(),
	equipment_id: int('equipment_id').default(-1).notNull(),
	stand_state: tinyint('stand_state').default(0).notNull(),
	sheath_state: tinyint('sheath_state').default(1).notNull(),
	emote_state: smallint('emote_state').notNull(),
	auras: text('auras')
});

export const creature_ai_events = mysqlTable('creature_ai_events', {
	id: int('id').autoincrement().notNull(),
	creature_id: int('creature_id').default(0).notNull(),
	condition_id: mediumint('condition_id').notNull(),
	event_type: tinyint('event_type').default(0).notNull(),
	event_inverse_phase_mask: int('event_inverse_phase_mask')
		.default(0)
		.notNull(),
	event_chance: int('event_chance').default(100).notNull(),
	event_flags: int('event_flags').default(0).notNull(),
	event_param1: int('event_param1').default(0).notNull(),
	event_param2: int('event_param2').default(0).notNull(),
	event_param3: int('event_param3').default(0).notNull(),
	event_param4: int('event_param4').default(0).notNull(),
	action1_script: int('action1_script').default(0).notNull(),
	action2_script: int('action2_script').default(0).notNull(),
	action3_script: int('action3_script').default(0).notNull(),
	comment: varchar('comment', { length: 255 }).default('').notNull()
});

export const creature_ai_scripts = mysqlTable('creature_ai_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const creature_battleground = mysqlTable('creature_battleground', {
	guid: int('guid').notNull(),
	event1: tinyint('event1').notNull(),
	event2: tinyint('event2').notNull()
});

export const creature_display_info_addon = mysqlTable(
	'creature_display_info_addon',
	{
		display_id: mediumint('display_id').notNull(),
		bounding_radius: float('bounding_radius').notNull(),
		combat_reach: float('combat_reach').notNull(),
		gender: tinyint('gender').default(2).notNull(),
		display_id_other_gender: mediumint('display_id_other_gender').notNull()
	}
);

export const creature_equip_template = mysqlTable('creature_equip_template', {
	entry: mediumint('entry').notNull(),
	equipentry1: mediumint('equipentry1').notNull(),
	equipentry2: mediumint('equipentry2').notNull(),
	equipentry3: mediumint('equipentry3').notNull()
});

export const creature_groups = mysqlTable('creature_groups', {
	leader_guid: int('leader_guid').notNull(),
	member_guid: int('member_guid').notNull(),
	// Warning: Can't parse float unsigned from database
	// float unsignedType: float unsigned("dist").notNull(),
	// Warning: Can't parse float unsigned from database
	// float unsignedType: float unsigned("angle").notNull(),
	flags: int('flags').notNull()
});

export const creature_involvedrelation = mysqlTable(
	'creature_involvedrelation',
	{
		id: mediumint('id').notNull(),
		quest: mediumint('quest').notNull()
	}
);

export const creature_linking = mysqlTable('creature_linking', {
	guid: int('guid').notNull(),
	master_guid: int('master_guid').notNull(),
	flag: mediumint('flag').notNull()
});

export const creature_linking_template = mysqlTable(
	'creature_linking_template',
	{
		entry: mediumint('entry').notNull(),
		map: smallint('map').notNull(),
		master_entry: mediumint('master_entry').notNull(),
		flag: mediumint('flag').notNull(),
		search_range: mediumint('search_range').notNull()
	}
);

export const creature_loot_template = mysqlTable('creature_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const creature_movement = mysqlTable('creature_movement', {
	id: int('id').notNull(),
	point: mediumint('point').notNull(),
	position_x: float('position_x').notNull(),
	position_y: float('position_y').notNull(),
	position_z: float('position_z').notNull(),
	orientation: float('orientation').notNull(),
	waittime: int('waittime').default(0).notNull(),
	// Warning: Can't parse float unsigned from database
	// float unsignedType: float unsigned("wander_distance").notNull(),
	script_id: mediumint('script_id').notNull()
});

export const creature_movement_scripts = mysqlTable(
	'creature_movement_scripts',
	{
		id: mediumint('id').notNull(),
		delay: int('delay').default(0).notNull(),
		priority: tinyint('priority').default(0).notNull(),
		command: mediumint('command').notNull(),
		datalong: mediumint('datalong').notNull(),
		datalong2: int('datalong2').default(0).notNull(),
		datalong3: int('datalong3').default(0).notNull(),
		datalong4: int('datalong4').default(0).notNull(),
		target_param1: int('target_param1').default(0).notNull(),
		target_param2: int('target_param2').default(0).notNull(),
		target_type: tinyint('target_type').default(0).notNull(),
		data_flags: tinyint('data_flags').default(0).notNull(),
		dataint: int('dataint').default(0).notNull(),
		dataint2: int('dataint2').default(0).notNull(),
		dataint3: int('dataint3').default(0).notNull(),
		dataint4: int('dataint4').default(0).notNull(),
		x: float('x').notNull(),
		y: float('y').notNull(),
		z: float('z').notNull(),
		o: float('o').notNull(),
		condition_id: mediumint('condition_id').notNull(),
		comments: varchar('comments', { length: 255 }).notNull()
	}
);

export const creature_movement_special = mysqlTable(
	'creature_movement_special',
	{
		id: int('id').notNull(),
		point: mediumint('point').notNull(),
		position_x: float('position_x').notNull(),
		position_y: float('position_y').notNull(),
		position_z: float('position_z').notNull(),
		orientation: float('orientation').notNull(),
		waittime: int('waittime').default(0).notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("wander_distance").notNull(),
		script_id: mediumint('script_id').notNull()
	}
);

export const creature_movement_template = mysqlTable(
	'creature_movement_template',
	{
		entry: mediumint('entry').notNull(),
		point: mediumint('point').notNull(),
		position_x: float('position_x').notNull(),
		position_y: float('position_y').notNull(),
		position_z: float('position_z').notNull(),
		orientation: float('orientation').notNull(),
		waittime: int('waittime').default(0).notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("wander_distance").notNull(),
		script_id: mediumint('script_id').notNull()
	}
);

export const creature_onkill_reputation = mysqlTable(
	'creature_onkill_reputation',
	{
		creature_id: mediumint('creature_id').notNull(),
		RewOnKillRepFaction1: smallint('RewOnKillRepFaction1').notNull(),
		RewOnKillRepFaction2: smallint('RewOnKillRepFaction2').notNull(),
		MaxStanding1: tinyint('MaxStanding1').default(0).notNull(),
		IsTeamAward1: tinyint('IsTeamAward1').default(0).notNull(),
		RewOnKillRepValue1: mediumint('RewOnKillRepValue1').notNull(),
		MaxStanding2: tinyint('MaxStanding2').default(0).notNull(),
		IsTeamAward2: tinyint('IsTeamAward2').default(0).notNull(),
		RewOnKillRepValue2: mediumint('RewOnKillRepValue2').notNull(),
		TeamDependent: tinyint('TeamDependent').default(0).notNull()
	}
);

export const creature_questrelation = mysqlTable('creature_questrelation', {
	id: mediumint('id').notNull(),
	quest: mediumint('quest').notNull()
});

export const creature_spells = mysqlTable('creature_spells', {
	entry: int('entry').default(0).notNull(),
	name: varchar('name', { length: 255 }).default('').notNull(),
	spellId_1: smallint('spellId_1').notNull(),
	probability_1: tinyint('probability_1').default(100).notNull(),
	castTarget_1: tinyint('castTarget_1').default(1).notNull(),
	targetParam1_1: smallint('targetParam1_1').notNull(),
	targetParam2_1: smallint('targetParam2_1').notNull(),
	castFlags_1: smallint('castFlags_1').notNull(),
	delayInitialMin_1: smallint('delayInitialMin_1').notNull(),
	delayInitialMax_1: smallint('delayInitialMax_1').notNull(),
	delayRepeatMin_1: smallint('delayRepeatMin_1').notNull(),
	delayRepeatMax_1: smallint('delayRepeatMax_1').notNull(),
	scriptId_1: mediumint('scriptId_1').notNull(),
	spellId_2: smallint('spellId_2').notNull(),
	probability_2: tinyint('probability_2').default(100).notNull(),
	castTarget_2: tinyint('castTarget_2').default(1).notNull(),
	targetParam1_2: smallint('targetParam1_2').notNull(),
	targetParam2_2: smallint('targetParam2_2').notNull(),
	castFlags_2: smallint('castFlags_2').notNull(),
	delayInitialMin_2: smallint('delayInitialMin_2').notNull(),
	delayInitialMax_2: smallint('delayInitialMax_2').notNull(),
	delayRepeatMin_2: smallint('delayRepeatMin_2').notNull(),
	delayRepeatMax_2: smallint('delayRepeatMax_2').notNull(),
	scriptId_2: mediumint('scriptId_2').notNull(),
	spellId_3: smallint('spellId_3').notNull(),
	probability_3: tinyint('probability_3').default(100).notNull(),
	castTarget_3: tinyint('castTarget_3').default(1).notNull(),
	targetParam1_3: smallint('targetParam1_3').notNull(),
	targetParam2_3: smallint('targetParam2_3').notNull(),
	castFlags_3: smallint('castFlags_3').notNull(),
	delayInitialMin_3: smallint('delayInitialMin_3').notNull(),
	delayInitialMax_3: smallint('delayInitialMax_3').notNull(),
	delayRepeatMin_3: smallint('delayRepeatMin_3').notNull(),
	delayRepeatMax_3: smallint('delayRepeatMax_3').notNull(),
	scriptId_3: mediumint('scriptId_3').notNull(),
	spellId_4: smallint('spellId_4').notNull(),
	probability_4: tinyint('probability_4').default(100).notNull(),
	castTarget_4: tinyint('castTarget_4').default(1).notNull(),
	targetParam1_4: smallint('targetParam1_4').notNull(),
	targetParam2_4: smallint('targetParam2_4').notNull(),
	castFlags_4: smallint('castFlags_4').notNull(),
	delayInitialMin_4: smallint('delayInitialMin_4').notNull(),
	delayInitialMax_4: smallint('delayInitialMax_4').notNull(),
	delayRepeatMin_4: smallint('delayRepeatMin_4').notNull(),
	delayRepeatMax_4: smallint('delayRepeatMax_4').notNull(),
	scriptId_4: mediumint('scriptId_4').notNull(),
	spellId_5: smallint('spellId_5').notNull(),
	probability_5: tinyint('probability_5').default(100).notNull(),
	castTarget_5: tinyint('castTarget_5').default(1).notNull(),
	targetParam1_5: smallint('targetParam1_5').notNull(),
	targetParam2_5: smallint('targetParam2_5').notNull(),
	castFlags_5: smallint('castFlags_5').notNull(),
	delayInitialMin_5: smallint('delayInitialMin_5').notNull(),
	delayInitialMax_5: smallint('delayInitialMax_5').notNull(),
	delayRepeatMin_5: smallint('delayRepeatMin_5').notNull(),
	delayRepeatMax_5: smallint('delayRepeatMax_5').notNull(),
	scriptId_5: mediumint('scriptId_5').notNull(),
	spellId_6: smallint('spellId_6').notNull(),
	probability_6: tinyint('probability_6').default(100).notNull(),
	castTarget_6: tinyint('castTarget_6').default(1).notNull(),
	targetParam1_6: smallint('targetParam1_6').notNull(),
	targetParam2_6: smallint('targetParam2_6').notNull(),
	castFlags_6: smallint('castFlags_6').notNull(),
	delayInitialMin_6: smallint('delayInitialMin_6').notNull(),
	delayInitialMax_6: smallint('delayInitialMax_6').notNull(),
	delayRepeatMin_6: smallint('delayRepeatMin_6').notNull(),
	delayRepeatMax_6: smallint('delayRepeatMax_6').notNull(),
	scriptId_6: mediumint('scriptId_6').notNull(),
	spellId_7: smallint('spellId_7').notNull(),
	probability_7: tinyint('probability_7').default(100).notNull(),
	castTarget_7: tinyint('castTarget_7').default(1).notNull(),
	targetParam1_7: smallint('targetParam1_7').notNull(),
	targetParam2_7: smallint('targetParam2_7').notNull(),
	castFlags_7: smallint('castFlags_7').notNull(),
	delayInitialMin_7: smallint('delayInitialMin_7').notNull(),
	delayInitialMax_7: smallint('delayInitialMax_7').notNull(),
	delayRepeatMin_7: smallint('delayRepeatMin_7').notNull(),
	delayRepeatMax_7: smallint('delayRepeatMax_7').notNull(),
	scriptId_7: mediumint('scriptId_7').notNull(),
	spellId_8: smallint('spellId_8').notNull(),
	probability_8: tinyint('probability_8').default(100).notNull(),
	castTarget_8: tinyint('castTarget_8').default(1).notNull(),
	targetParam1_8: smallint('targetParam1_8').notNull(),
	targetParam2_8: smallint('targetParam2_8').notNull(),
	castFlags_8: smallint('castFlags_8').notNull(),
	delayInitialMin_8: smallint('delayInitialMin_8').notNull(),
	delayInitialMax_8: smallint('delayInitialMax_8').notNull(),
	delayRepeatMin_8: smallint('delayRepeatMin_8').notNull(),
	delayRepeatMax_8: smallint('delayRepeatMax_8').notNull(),
	scriptId_8: mediumint('scriptId_8').notNull()
});

export const creature_spells_scripts = mysqlTable('creature_spells_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const creature_template = mysqlTable('creature_template', {
	entry: mediumint('entry').notNull(),
	display_id1: mediumint('display_id1').notNull(),
	display_id2: mediumint('display_id2').notNull(),
	display_id3: mediumint('display_id3').notNull(),
	display_id4: mediumint('display_id4').notNull(),
	mount_display_id: smallint('mount_display_id').notNull(),
	name: char('name', { length: 100 }).default('0').notNull(),
	subname: char('subname', { length: 100 }),
	gossip_menu_id: mediumint('gossip_menu_id').notNull(),
	level_min: tinyint('level_min').default(1).notNull(),
	level_max: tinyint('level_max').default(1).notNull(),
	health_min: int('health_min').default(0).notNull(),
	health_max: int('health_max').default(0).notNull(),
	mana_min: int('mana_min').default(0).notNull(),
	mana_max: int('mana_max').default(0).notNull(),
	armor: mediumint('armor').notNull(),
	faction: smallint('faction').notNull(),
	npc_flags: int('npc_flags').default(0).notNull(),
	speed_walk: float('speed_walk').default(1).notNull(),
	speed_run: float('speed_run').default(1.14286).notNull(),
	scale: float('scale').default(1).notNull(),
	detection_range: float('detection_range').default(20).notNull(),
	call_for_help_range: float('call_for_help_range').default(5).notNull(),
	leash_range: float('leash_range').notNull(),
	rank: tinyint('rank').default(0).notNull(),
	xp_multiplier: float('xp_multiplier').default(1).notNull(),
	dmg_min: float('dmg_min').notNull(),
	dmg_max: float('dmg_max').notNull(),
	dmg_school: tinyint('dmg_school').default(0).notNull(),
	attack_power: int('attack_power').default(0).notNull(),
	dmg_multiplier: float('dmg_multiplier').default(1).notNull(),
	base_attack_time: int('base_attack_time').default(0).notNull(),
	ranged_attack_time: int('ranged_attack_time').default(0).notNull(),
	unit_class: tinyint('unit_class').default(0).notNull(),
	unit_flags: int('unit_flags').default(0).notNull(),
	dynamic_flags: int('dynamic_flags').default(0).notNull(),
	beast_family: tinyint('beast_family').default(0).notNull(),
	trainer_type: tinyint('trainer_type').default(0).notNull(),
	trainer_spell: mediumint('trainer_spell').notNull(),
	trainer_class: tinyint('trainer_class').default(0).notNull(),
	trainer_race: tinyint('trainer_race').default(0).notNull(),
	ranged_dmg_min: float('ranged_dmg_min').notNull(),
	ranged_dmg_max: float('ranged_dmg_max').notNull(),
	ranged_attack_power: smallint('ranged_attack_power').notNull(),
	type: tinyint('type').default(0).notNull(),
	type_flags: int('type_flags').default(0).notNull(),
	loot_id: mediumint('loot_id').notNull(),
	pickpocket_loot_id: mediumint('pickpocket_loot_id').notNull(),
	skinning_loot_id: mediumint('skinning_loot_id').notNull(),
	holy_res: smallint('holy_res').notNull(),
	fire_res: smallint('fire_res').notNull(),
	nature_res: smallint('nature_res').notNull(),
	frost_res: smallint('frost_res').notNull(),
	shadow_res: smallint('shadow_res').notNull(),
	arcane_res: smallint('arcane_res').notNull(),
	spell_id1: mediumint('spell_id1').notNull(),
	spell_id2: mediumint('spell_id2').notNull(),
	spell_id3: mediumint('spell_id3').notNull(),
	spell_id4: mediumint('spell_id4').notNull(),
	spell_list_id: int('spell_list_id').default(0).notNull(),
	pet_spell_list_id: mediumint('pet_spell_list_id').notNull(),
	spawn_spell_id: mediumint('spawn_spell_id').notNull(),
	auras: text('auras'),
	gold_min: mediumint('gold_min').notNull(),
	gold_max: mediumint('gold_max').notNull(),
	ai_name: char('ai_name', { length: 64 }).default('').notNull(),
	movement_type: tinyint('movement_type').default(0).notNull(),
	inhabit_type: tinyint('inhabit_type').default(3).notNull(),
	civilian: tinyint('civilian').default(0).notNull(),
	racial_leader: tinyint('racial_leader').default(0).notNull(),
	regeneration: tinyint('regeneration').default(3).notNull(),
	equipment_id: mediumint('equipment_id').notNull(),
	trainer_id: mediumint('trainer_id').notNull(),
	vendor_id: mediumint('vendor_id').notNull(),
	mechanic_immune_mask: int('mechanic_immune_mask').default(0).notNull(),
	school_immune_mask: int('school_immune_mask').default(0).notNull(),
	flags_extra: int('flags_extra').default(0).notNull(),
	phase_quest_id: int('phase_quest_id').default(0).notNull(),
	script_name: char('script_name', { length: 64 }).default('').notNull()
});

export const custom_character_skins = mysqlTable('custom_character_skins', {
	token_id: mediumint('token_id').notNull(),
	skin_male: smallint('skin_male').notNull(),
	skin_female: smallint('skin_female').notNull()
});

export const custom_graveyards = mysqlTable('custom_graveyards', {
	id: mediumint('id').notNull(),
	name: varchar('name', { length: 64 }).default('').notNull(),
	map_id: smallint('map_id').notNull(),
	zone_id: smallint('zone_id').notNull(),
	area_id: smallint('area_id').notNull(),
	max_level: tinyint('max_level').default(0).notNull(),
	map_gy_alliance: smallint('map_gy_alliance').notNull(),
	gy_x_alliance: float('gy_x_alliance').notNull(),
	gy_y_alliance: float('gy_y_alliance').notNull(),
	gy_z_alliance: float('gy_z_alliance').notNull(),
	orientation_alliance: float('orientation_alliance').notNull(),
	map_gy_horde: smallint('map_gy_horde').notNull(),
	gy_x_horde: float('gy_x_horde').notNull(),
	gy_y_horde: float('gy_y_horde').notNull(),
	gy_z_horde: float('gy_z_horde').notNull(),
	orientation_horde: float('orientation_horde').notNull()
});

export const daily_quest_timer = mysqlTable('daily_quest_timer', {
	nextResetTime: bigint('nextResetTime', { mode: 'number' }).notNull()
});

export const disenchant_loot_template = mysqlTable('disenchant_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const event_scripts = mysqlTable('event_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const exploration_basexp = mysqlTable('exploration_basexp', {
	level: tinyint('level').default(0).notNull(),
	basexp: mediumint('basexp').notNull()
});

export const faction = mysqlTable('faction', {
	id: smallint('id').notNull(),
	reputation_list_id: mediumint('reputation_list_id').notNull(),
	base_rep_race_mask1: mediumint('base_rep_race_mask1').notNull(),
	base_rep_race_mask2: mediumint('base_rep_race_mask2').notNull(),
	base_rep_race_mask3: mediumint('base_rep_race_mask3').notNull(),
	base_rep_race_mask4: mediumint('base_rep_race_mask4').notNull(),
	base_rep_class_mask1: mediumint('base_rep_class_mask1').notNull(),
	base_rep_class_mask2: mediumint('base_rep_class_mask2').notNull(),
	base_rep_class_mask3: mediumint('base_rep_class_mask3').notNull(),
	base_rep_class_mask4: mediumint('base_rep_class_mask4').notNull(),
	base_rep_value1: mediumint('base_rep_value1').notNull(),
	base_rep_value2: mediumint('base_rep_value2').notNull(),
	base_rep_value3: mediumint('base_rep_value3').notNull(),
	base_rep_value4: mediumint('base_rep_value4').notNull(),
	reputation_flags1: mediumint('reputation_flags1').notNull(),
	reputation_flags2: mediumint('reputation_flags2').notNull(),
	reputation_flags3: mediumint('reputation_flags3').notNull(),
	reputation_flags4: mediumint('reputation_flags4').notNull(),
	team: mediumint('team').notNull(),
	name1: varchar('name1', { length: 256 }).default('').notNull(),
	name2: varchar('name2', { length: 256 }).default('').notNull(),
	name3: varchar('name3', { length: 256 }).default('').notNull(),
	name4: varchar('name4', { length: 256 }).default('').notNull(),
	name5: varchar('name5', { length: 256 }).default('').notNull(),
	name6: varchar('name6', { length: 256 }).default('').notNull(),
	name7: varchar('name7', { length: 256 }).default('').notNull(),
	name8: varchar('name8', { length: 256 }).default('').notNull(),
	description1: varchar('description1', { length: 512 }).default('').notNull(),
	description2: varchar('description2', { length: 512 }).default('').notNull(),
	description3: varchar('description3', { length: 512 }).default('').notNull(),
	description4: varchar('description4', { length: 512 }).default('').notNull(),
	description5: varchar('description5', { length: 512 }).default('').notNull(),
	description6: varchar('description6', { length: 512 }).default('').notNull(),
	description7: varchar('description7', { length: 512 }).default('').notNull(),
	description8: varchar('description8', { length: 512 }).default('').notNull()
});

export const faction_template = mysqlTable('faction_template', {
	id: smallint('id').notNull(),
	faction_id: mediumint('faction_id').notNull(),
	faction_flags: mediumint('faction_flags').notNull(),
	our_mask: mediumint('our_mask').notNull(),
	friendly_mask: mediumint('friendly_mask').notNull(),
	hostile_mask: mediumint('hostile_mask').notNull(),
	enemy_faction1: mediumint('enemy_faction1').notNull(),
	enemy_faction2: mediumint('enemy_faction2').notNull(),
	enemy_faction3: mediumint('enemy_faction3').notNull(),
	enemy_faction4: mediumint('enemy_faction4').notNull(),
	friend_faction1: mediumint('friend_faction1').notNull(),
	friend_faction2: mediumint('friend_faction2').notNull(),
	friend_faction3: mediumint('friend_faction3').notNull(),
	friend_faction4: mediumint('friend_faction4').notNull()
});

export const fishing_loot_template = mysqlTable('fishing_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const gameobject = mysqlTable(
	'gameobject',
	{
		guid: int('guid').autoincrement().notNull(),
		id: mediumint('id').notNull(),
		map: smallint('map').notNull(),
		position_x: float('position_x').notNull(),
		position_y: float('position_y').notNull(),
		position_z: float('position_z').notNull(),
		orientation: float('orientation').notNull(),
		rotation0: float('rotation0').notNull(),
		rotation1: float('rotation1').notNull(),
		rotation2: float('rotation2').notNull(),
		rotation3: float('rotation3').notNull(),
		spawntimesecsmin: int('spawntimesecsmin').default(0).notNull(),
		spawntimesecsmax: int('spawntimesecsmax').default(0).notNull(),
		animprogress: tinyint('animprogress').default(0).notNull(),
		state: tinyint('state').default(0).notNull(),
		spawn_flags: int('spawn_flags').default(0).notNull(),
		visibility_mod: float('visibility_mod')
	},
	table => ({
		idx_map: index('idx_map').on(table.map),
		idx_id: index('idx_id').on(table.id)
	})
);

export const gameobject_battleground = mysqlTable('gameobject_battleground', {
	guid: int('guid').notNull(),
	event1: tinyint('event1').notNull(),
	event2: tinyint('event2').notNull()
});

export const gameobject_display_info_addon = mysqlTable(
	'gameobject_display_info_addon',
	{
		display_id: int('display_id').default(0).notNull(),
		min_x: float('min_x').notNull(),
		min_y: float('min_y').notNull(),
		min_z: float('min_z').notNull(),
		max_x: float('max_x').notNull(),
		max_y: float('max_y').notNull(),
		max_z: float('max_z').notNull()
	}
);

export const gameobject_involvedrelation = mysqlTable(
	'gameobject_involvedrelation',
	{
		id: mediumint('id').notNull(),
		quest: mediumint('quest').notNull()
	}
);

export const gameobject_loot_template = mysqlTable('gameobject_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const gameobject_questrelation = mysqlTable('gameobject_questrelation', {
	id: mediumint('id').notNull(),
	quest: mediumint('quest').notNull()
});

export const gameobject_requirement = mysqlTable('gameobject_requirement', {
	guid: int('guid').autoincrement().notNull(),
	reqType: int('reqType').default(0).notNull(),
	reqGuid: int('reqGuid').default(0).notNull()
});

export const gameobject_scripts = mysqlTable('gameobject_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const gameobject_template = mysqlTable('gameobject_template', {
	entry: mediumint('entry').notNull(),
	type: tinyint('type').default(0).notNull(),
	displayId: mediumint('displayId').notNull(),
	name: varchar('name', { length: 100 }).default('').notNull(),
	faction: smallint('faction').notNull(),
	flags: int('flags').default(0).notNull(),
	size: float('size').default(1).notNull(),
	data0: int('data0').default(0).notNull(),
	data1: int('data1').default(0).notNull(),
	data2: int('data2').default(0).notNull(),
	data3: int('data3').default(0).notNull(),
	data4: int('data4').default(0).notNull(),
	data5: int('data5').default(0).notNull(),
	data6: int('data6').default(0).notNull(),
	data7: int('data7').default(0).notNull(),
	data8: int('data8').default(0).notNull(),
	data9: int('data9').default(0).notNull(),
	data10: int('data10').default(0).notNull(),
	data11: int('data11').default(0).notNull(),
	data12: int('data12').default(0).notNull(),
	data13: int('data13').default(0).notNull(),
	data14: int('data14').default(0).notNull(),
	data15: int('data15').default(0).notNull(),
	data16: int('data16').default(0).notNull(),
	data17: int('data17').default(0).notNull(),
	data18: int('data18').default(0).notNull(),
	data19: int('data19').default(0).notNull(),
	data20: int('data20').default(0).notNull(),
	data21: int('data21').default(0).notNull(),
	data22: int('data22').default(0).notNull(),
	data23: int('data23').default(0).notNull(),
	mingold: mediumint('mingold').notNull(),
	maxgold: mediumint('maxgold').notNull(),
	phase_quest_id: int('phase_quest_id').default(0).notNull(),
	script_name: varchar('script_name', { length: 64 }).default('').notNull()
});

export const game_event = mysqlTable('game_event', {
	entry: mediumint('entry').notNull(),
	start_time: timestamp('start_time', { mode: 'string' })
		.default('0000-00-00 00:00:00')
		.notNull(),
	end_time: timestamp('end_time', { mode: 'string' })
		.default('0000-00-00 00:00:00')
		.notNull(),
	occurence: bigint('occurence', { mode: 'number' }).default(5184000).notNull(),
	length: bigint('length', { mode: 'number' }).default(2592000).notNull(),
	holiday: mediumint('holiday').notNull(),
	description: varchar('description', { length: 255 }),
	hardcoded: tinyint('hardcoded').default(0).notNull(),
	disabled: tinyint('disabled').default(0).notNull()
});

export const game_event_creature = mysqlTable('game_event_creature', {
	guid: int('guid').notNull(),
	event: smallint('event').notNull()
});

export const game_event_creature_data = mysqlTable('game_event_creature_data', {
	guid: int('guid').default(0).notNull(),
	entry_id: mediumint('entry_id').notNull(),
	display_id: mediumint('display_id').notNull(),
	equipment_id: mediumint('equipment_id').notNull(),
	spell_start: mediumint('spell_start').notNull(),
	spell_end: mediumint('spell_end').notNull(),
	event: smallint('event').notNull()
});

export const game_event_gameobject = mysqlTable('game_event_gameobject', {
	guid: int('guid').notNull(),
	event: smallint('event').notNull()
});

export const game_event_mail = mysqlTable('game_event_mail', {
	event: smallint('event').notNull(),
	raceMask: mediumint('raceMask').notNull(),
	quest: mediumint('quest').notNull(),
	mailTemplateId: mediumint('mailTemplateId').notNull(),
	senderEntry: mediumint('senderEntry').notNull()
});

export const game_event_quest = mysqlTable('game_event_quest', {
	quest: mediumint('quest').notNull(),
	event: smallint('event').notNull()
});

export const game_graveyard_zone = mysqlTable('game_graveyard_zone', {
	id: mediumint('id').notNull(),
	ghost_zone: mediumint('ghost_zone').notNull(),
	faction: smallint('faction').notNull()
});

export const game_tele = mysqlTable('game_tele', {
	id: mediumint('id').autoincrement().notNull(),
	position_x: float('position_x').notNull(),
	position_y: float('position_y').notNull(),
	position_z: float('position_z').notNull(),
	orientation: float('orientation').notNull(),
	map: smallint('map').notNull(),
	name: varchar('name', { length: 100 }).default('').notNull()
});

export const game_weather = mysqlTable('game_weather', {
	zone: mediumint('zone').notNull(),
	copy_weather_from: mediumint('copy_weather_from'),
	spring_rain_chance: tinyint('spring_rain_chance').default(25).notNull(),
	spring_snow_chance: tinyint('spring_snow_chance').default(25).notNull(),
	spring_storm_chance: tinyint('spring_storm_chance').default(25).notNull(),
	summer_rain_chance: tinyint('summer_rain_chance').default(25).notNull(),
	summer_snow_chance: tinyint('summer_snow_chance').default(25).notNull(),
	summer_storm_chance: tinyint('summer_storm_chance').default(25).notNull(),
	fall_rain_chance: tinyint('fall_rain_chance').default(25).notNull(),
	fall_snow_chance: tinyint('fall_snow_chance').default(25).notNull(),
	fall_storm_chance: tinyint('fall_storm_chance').default(25).notNull(),
	winter_rain_chance: tinyint('winter_rain_chance').default(25).notNull(),
	winter_snow_chance: tinyint('winter_snow_chance').default(25).notNull(),
	winter_storm_chance: tinyint('winter_storm_chance').default(25).notNull()
});

export const generic_scripts = mysqlTable('generic_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const gm_subsurveys = mysqlTable('gm_subsurveys', {
	surveyId: int('surveyId').autoincrement().notNull(),
	subsurveyId: int('subsurveyId').default(0).notNull(),
	rank: int('rank').default(0).notNull(),
	comment: text('comment').notNull()
});

export const gm_surveys = mysqlTable('gm_surveys', {
	surveyId: int('surveyId').autoincrement().notNull(),
	guid: int('guid').default(0).notNull(),
	mainSurvey: int('mainSurvey').default(0).notNull(),
	overallComment: longtext('overallComment').notNull(),
	createTime: int('createTime').default(0).notNull()
});

export const gm_tickets = mysqlTable('gm_tickets', {
	ticketId: int('ticketId').autoincrement().notNull(),
	guid: int('guid').default(0).notNull(),
	name: varchar('name', { length: 12 }).notNull(),
	message: text('message').notNull(),
	createTime: int('createTime').default(0).notNull(),
	mapId: smallint('mapId').notNull(),
	posX: float('posX').notNull(),
	posY: float('posY').notNull(),
	posZ: float('posZ').notNull(),
	lastModifiedTime: int('lastModifiedTime').default(0).notNull(),
	closedBy: int('closedBy').default(0).notNull(),
	assignedTo: int('assignedTo').default(0).notNull(),
	comment: text('comment').notNull(),
	response: text('response').notNull(),
	completed: tinyint('completed').default(0).notNull(),
	escalated: tinyint('escalated').default(0).notNull(),
	viewed: tinyint('viewed').default(0).notNull(),
	haveTicket: tinyint('haveTicket').default(0).notNull(),
	ticketType: tinyint('ticketType').default(0).notNull(),
	securityNeeded: tinyint('securityNeeded').default(0).notNull()
});

export const gossip_menu = mysqlTable('gossip_menu', {
	entry: smallint('entry').notNull(),
	text_id: mediumint('text_id').notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const gossip_menu_option = mysqlTable('gossip_menu_option', {
	menu_id: smallint('menu_id').notNull(),
	id: smallint('id').notNull(),
	option_icon: mediumint('option_icon').notNull(),
	option_text: text('option_text'),
	OptionBroadcastTextID: mediumint('OptionBroadcastTextID').notNull(),
	option_id: tinyint('option_id').default(0).notNull(),
	npc_option_npcflag: int('npc_option_npcflag').default(0).notNull(),
	action_menu_id: mediumint('action_menu_id').notNull(),
	action_poi_id: mediumint('action_poi_id').notNull(),
	action_script_id: mediumint('action_script_id').notNull(),
	box_coded: tinyint('box_coded').default(0).notNull(),
	box_money: int('box_money').default(0).notNull(),
	box_text: text('box_text'),
	BoxBroadcastTextID: mediumint('BoxBroadcastTextID').notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const gossip_scripts = mysqlTable('gossip_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const guild_bank = mysqlTable(
	'guild_bank',
	{
		guildid: int('guildid').notNull(),
		guid: int('guid').notNull(),
		tab: int('tab').default(0).notNull(),
		slot: tinyint('slot').notNull(),
		item_template: int('item_template').notNull(),
		creatorGuid: int('creatorGuid').default(0).notNull(),
		giftCreatorGuid: int('giftCreatorGuid').default(0).notNull(),
		count: int('count').default(0).notNull(),
		duration: int('duration').default(0).notNull(),
		charges: tinytext('charges'),
		flags: mediumint('flags').notNull(),
		enchantments: text('enchantments').notNull(),
		randomPropertyId: smallint('randomPropertyId').notNull(),
		transmogrifyId: int('transmogrifyId').default(0).notNull(),
		durability: smallint('durability').notNull(),
		text: int('text').default(0).notNull(),
		generated_loot: tinyint('generated_loot').default(0)
	},
	table => ({
		guildidandguid: unique('guildidandguid').on(table.guildid, table.guid)
	})
);

export const guild_bank_log = mysqlTable(
	'guild_bank_log',
	{
		log_id: int('log_id').autoincrement().notNull(),
		guildid: int('guildid').notNull(),
		player: int('player').notNull(),
		action: int('action').notNull(),
		tab: int('tab').default(1).notNull(),
		item: int('item').notNull(),
		randomPropertyId: int('randomPropertyId').default(0).notNull(),
		enchant: int('enchant').default(0).notNull(),
		count: int('count').notNull(),
		stamp: bigint('stamp', { mode: 'number' }).notNull()
	},
	table => ({
		stamp: index('stamp').on(table.stamp)
	})
);

export const guild_bank_money = mysqlTable(
	'guild_bank_money',
	{
		guildid: int('guildid').notNull(),
		money: int('money').default(0).notNull()
	},
	table => ({
		guildid: unique('guildid').on(table.guildid)
	})
);

export const guild_bank_tabs = mysqlTable('guild_bank_tabs', {
	id: int('id').autoincrement().notNull(),
	guildid: int('guildid').notNull(),
	tabs: int('tabs').default(0).notNull(),
	name1: varchar('name1', { length: 64 }).default('Tab1').notNull(),
	name2: varchar('name2', { length: 64 }).default('Tab2').notNull(),
	name3: varchar('name3', { length: 64 }).default('Tab3').notNull(),
	name4: varchar('name4', { length: 64 }).default('Tab4').notNull(),
	name5: varchar('name5', { length: 64 }).default('Tab5').notNull(),
	icon1: varchar('icon1', { length: 128 }).default('inv_misc_bag_08').notNull(),
	icon2: varchar('icon2', { length: 128 }).default('inv_misc_bag_05').notNull(),
	icon3: varchar('icon3', { length: 128 }).default('inv_misc_bag_03').notNull(),
	icon4: varchar('icon4', { length: 128 }).default('inv_misc_bag_06').notNull(),
	icon5: varchar('icon5', { length: 128 }).default('inv_misc_bag_02').notNull(),
	withdrawal1: int('withdrawal1').default(0).notNull(),
	withdrawal2: int('withdrawal2').default(0).notNull(),
	withdrawal3: int('withdrawal3').default(0).notNull(),
	withdrawal4: int('withdrawal4').default(0).notNull(),
	withdrawal5: int('withdrawal5').default(0).notNull(),
	minrank1: int('minrank1').default(0).notNull(),
	minrank2: int('minrank2').default(0).notNull(),
	minrank3: int('minrank3').default(0).notNull(),
	minrank4: int('minrank4').default(0).notNull(),
	minrank5: int('minrank5').default(0).notNull()
});

export const instance_buff_removal = mysqlTable('instance_buff_removal', {
	map_id: int('map_id').notNull(),
	spell_id: int('spell_id').notNull(),
	enabled: tinyint('enabled').notNull(),
	flags: int('flags').notNull(),
	comment: varchar('comment', { length: 256 }).notNull()
});

export const item_display_info = mysqlTable('item_display_info', {
	ID: int('ID').notNull(),
	icon: varchar('icon', { length: 255 })
});

export const item_enchantment_template = mysqlTable(
	'item_enchantment_template',
	{
		entry: mediumint('entry').notNull(),
		ench: mediumint('ench').notNull()
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("chance").notNull(),
	}
);

export const item_loot_template = mysqlTable('item_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const item_required_target = mysqlTable(
	'item_required_target',
	{
		entry: mediumint('entry').notNull(),
		type: tinyint('type').default(0).notNull(),
		target_entry: mediumint('target_entry').notNull()
	},
	table => ({
		entry_type_target: unique('entry_type_target').on(
			table.entry,
			table.type,
			table.target_entry
		)
	})
);

export const item_template = mysqlTable(
	'item_template',
	{
		entry: mediumint('entry').notNull(),
		class: tinyint('class').default(0).notNull(),
		subclass: tinyint('subclass').default(0).notNull(),
		name: varchar('name', { length: 255 }).default('').notNull(),
		description: varchar('description', { length: 255 }).default('').notNull(),
		display_id: mediumint('display_id').notNull(),
		quality: tinyint('quality').default(0).notNull(),
		flags: int('flags').default(0).notNull(),
		buy_count: tinyint('buy_count').default(1).notNull(),
		buy_price: int('buy_price').default(0).notNull(),
		sell_price: int('sell_price').default(0).notNull(),
		inventory_type: tinyint('inventory_type').default(0).notNull(),
		allowable_class: mediumint('allowable_class').default(-1).notNull(),
		allowable_race: mediumint('allowable_race').default(-1).notNull(),
		item_level: tinyint('item_level').default(0).notNull(),
		required_level: tinyint('required_level').default(0).notNull(),
		required_skill: smallint('required_skill').notNull(),
		required_skill_rank: smallint('required_skill_rank').notNull(),
		required_spell: mediumint('required_spell').notNull(),
		required_honor_rank: mediumint('required_honor_rank').notNull(),
		required_city_rank: mediumint('required_city_rank').notNull(),
		required_reputation_faction: smallint(
			'required_reputation_faction'
		).notNull(),
		required_reputation_rank: smallint('required_reputation_rank').notNull(),
		max_count: smallint('max_count').notNull(),
		stackable: smallint('stackable').default(1).notNull(),
		container_slots: tinyint('container_slots').default(0).notNull(),
		stat_type1: tinyint('stat_type1').default(0).notNull(),
		stat_value1: smallint('stat_value1').notNull(),
		stat_type2: tinyint('stat_type2').default(0).notNull(),
		stat_value2: smallint('stat_value2').notNull(),
		stat_type3: tinyint('stat_type3').default(0).notNull(),
		stat_value3: smallint('stat_value3').notNull(),
		stat_type4: tinyint('stat_type4').default(0).notNull(),
		stat_value4: smallint('stat_value4').notNull(),
		stat_type5: tinyint('stat_type5').default(0).notNull(),
		stat_value5: smallint('stat_value5').notNull(),
		stat_type6: tinyint('stat_type6').default(0).notNull(),
		stat_value6: smallint('stat_value6').notNull(),
		stat_type7: tinyint('stat_type7').default(0).notNull(),
		stat_value7: smallint('stat_value7').notNull(),
		stat_type8: tinyint('stat_type8').default(0).notNull(),
		stat_value8: smallint('stat_value8').notNull(),
		stat_type9: tinyint('stat_type9').default(0).notNull(),
		stat_value9: smallint('stat_value9').notNull(),
		stat_type10: tinyint('stat_type10').default(0).notNull(),
		stat_value10: smallint('stat_value10').notNull(),
		delay: smallint('delay').default(1000).notNull(),
		range_mod: float('range_mod').notNull(),
		ammo_type: tinyint('ammo_type').default(0).notNull(),
		dmg_min1: float('dmg_min1').notNull(),
		dmg_max1: float('dmg_max1').notNull(),
		dmg_type1: tinyint('dmg_type1').default(0).notNull(),
		dmg_min2: float('dmg_min2').notNull(),
		dmg_max2: float('dmg_max2').notNull(),
		dmg_type2: tinyint('dmg_type2').default(0).notNull(),
		dmg_min3: float('dmg_min3').notNull(),
		dmg_max3: float('dmg_max3').notNull(),
		dmg_type3: tinyint('dmg_type3').default(0).notNull(),
		dmg_min4: float('dmg_min4').notNull(),
		dmg_max4: float('dmg_max4').notNull(),
		dmg_type4: tinyint('dmg_type4').default(0).notNull(),
		dmg_min5: float('dmg_min5').notNull(),
		dmg_max5: float('dmg_max5').notNull(),
		dmg_type5: tinyint('dmg_type5').default(0).notNull(),
		block: mediumint('block').notNull(),
		armor: smallint('armor').notNull(),
		holy_res: smallint('holy_res').notNull(),
		fire_res: smallint('fire_res').notNull(),
		nature_res: smallint('nature_res').notNull(),
		frost_res: smallint('frost_res').notNull(),
		shadow_res: smallint('shadow_res').notNull(),
		arcane_res: smallint('arcane_res').notNull(),
		spellid_1: mediumint('spellid_1').notNull(),
		spelltrigger_1: tinyint('spelltrigger_1').default(0).notNull(),
		spellcharges_1: tinyint('spellcharges_1').default(0).notNull(),
		spellppmrate_1: float('spellppmrate_1').notNull(),
		spellcooldown_1: int('spellcooldown_1').default(-1).notNull(),
		spellcategory_1: smallint('spellcategory_1').notNull(),
		spellcategorycooldown_1: int('spellcategorycooldown_1')
			.default(-1)
			.notNull(),
		spellid_2: mediumint('spellid_2').notNull(),
		spelltrigger_2: tinyint('spelltrigger_2').default(0).notNull(),
		spellcharges_2: tinyint('spellcharges_2').default(0).notNull(),
		spellppmrate_2: float('spellppmrate_2').notNull(),
		spellcooldown_2: int('spellcooldown_2').default(-1).notNull(),
		spellcategory_2: smallint('spellcategory_2').notNull(),
		spellcategorycooldown_2: int('spellcategorycooldown_2')
			.default(-1)
			.notNull(),
		spellid_3: mediumint('spellid_3').notNull(),
		spelltrigger_3: tinyint('spelltrigger_3').default(0).notNull(),
		spellcharges_3: tinyint('spellcharges_3').default(0).notNull(),
		spellppmrate_3: float('spellppmrate_3').notNull(),
		spellcooldown_3: int('spellcooldown_3').default(-1).notNull(),
		spellcategory_3: smallint('spellcategory_3').notNull(),
		spellcategorycooldown_3: int('spellcategorycooldown_3')
			.default(-1)
			.notNull(),
		spellid_4: mediumint('spellid_4').notNull(),
		spelltrigger_4: tinyint('spelltrigger_4').default(0).notNull(),
		spellcharges_4: tinyint('spellcharges_4').default(0).notNull(),
		spellppmrate_4: float('spellppmrate_4').notNull(),
		spellcooldown_4: int('spellcooldown_4').default(-1).notNull(),
		spellcategory_4: smallint('spellcategory_4').notNull(),
		spellcategorycooldown_4: int('spellcategorycooldown_4')
			.default(-1)
			.notNull(),
		spellid_5: mediumint('spellid_5').notNull(),
		spelltrigger_5: tinyint('spelltrigger_5').default(0).notNull(),
		spellcharges_5: tinyint('spellcharges_5').default(0).notNull(),
		spellppmrate_5: float('spellppmrate_5').notNull(),
		spellcooldown_5: int('spellcooldown_5').default(-1).notNull(),
		spellcategory_5: smallint('spellcategory_5').notNull(),
		spellcategorycooldown_5: int('spellcategorycooldown_5')
			.default(-1)
			.notNull(),
		bonding: tinyint('bonding').default(0).notNull(),
		page_text: mediumint('page_text').notNull(),
		page_language: tinyint('page_language').default(0).notNull(),
		page_material: tinyint('page_material').default(0).notNull(),
		start_quest: mediumint('start_quest').notNull(),
		lock_id: mediumint('lock_id').notNull(),
		material: tinyint('material').default(0).notNull(),
		sheath: tinyint('sheath').default(0).notNull(),
		random_property: mediumint('random_property').notNull(),
		set_id: mediumint('set_id').notNull(),
		max_durability: smallint('max_durability').notNull(),
		area_bound: mediumint('area_bound').notNull(),
		map_bound: smallint('map_bound').notNull(),
		duration: int('duration').default(0).notNull(),
		bag_family: mediumint('bag_family').notNull(),
		disenchant_id: mediumint('disenchant_id').notNull(),
		food_type: tinyint('food_type').default(0).notNull(),
		min_money_loot: int('min_money_loot').default(0).notNull(),
		max_money_loot: int('max_money_loot').default(0).notNull(),
		extra_flags: tinyint('extra_flags').default(0).notNull(),
		other_team_entry: int('other_team_entry').default(1),
		script_name: varchar('script_name', { length: 255 })
	},
	table => ({
		items_idx: index('items_index').on(table.class)
	})
);

export const item_transmogrify_template = mysqlTable(
	'item_transmogrify_template',
	{
		ID: int('ID').notNull(),
		ItemID: int('ItemID').notNull(),
		DisplayID: int('DisplayID').notNull(),
		SourceID: int('SourceID').notNull()
	}
);

export const locales_area = mysqlTable('locales_area', {
	Entry: mediumint('Entry').notNull(),
	NameLoc1: varchar('NameLoc1', { length: 100 }).default('').notNull(),
	NameLoc2: varchar('NameLoc2', { length: 100 }).default('').notNull(),
	NameLoc3: varchar('NameLoc3', { length: 100 }).default('').notNull(),
	NameLoc4: varchar('NameLoc4', { length: 100 }).default('').notNull(),
	NameLoc5: varchar('NameLoc5', { length: 100 }).default('').notNull(),
	NameLoc6: varchar('NameLoc6', { length: 100 }).default('').notNull(),
	NameLoc7: varchar('NameLoc7', { length: 100 }).default('').notNull(),
	NameLoc8: varchar('NameLoc8', { length: 100 }).default('').notNull()
});

export const locales_broadcast_text = mysqlTable('locales_broadcast_text', {
	entry: mediumint('entry').notNull(),
	male_text_loc1: longtext('male_text_loc1'),
	male_text_loc2: longtext('male_text_loc2'),
	male_text_loc3: longtext('male_text_loc3'),
	male_text_loc4: longtext('male_text_loc4'),
	male_text_loc5: longtext('male_text_loc5'),
	male_text_loc6: longtext('male_text_loc6'),
	male_text_loc7: longtext('male_text_loc7'),
	male_text_loc8: longtext('male_text_loc8'),
	female_text_loc1: longtext('female_text_loc1'),
	female_text_loc2: longtext('female_text_loc2'),
	female_text_loc3: longtext('female_text_loc3'),
	female_text_loc4: longtext('female_text_loc4'),
	female_text_loc5: longtext('female_text_loc5'),
	female_text_loc6: longtext('female_text_loc6'),
	female_text_loc7: longtext('female_text_loc7'),
	female_text_loc8: longtext('female_text_loc8')
});

export const locales_creature = mysqlTable('locales_creature', {
	entry: mediumint('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 100 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 100 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 100 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 100 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 100 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 100 }).default('').notNull(),
	name_loc7: varchar('name_loc7', { length: 100 }).default('').notNull(),
	name_loc8: varchar('name_loc8', { length: 100 }).default('').notNull(),
	subname_loc1: varchar('subname_loc1', { length: 100 }),
	subname_loc2: varchar('subname_loc2', { length: 100 }),
	subname_loc3: varchar('subname_loc3', { length: 100 }),
	subname_loc4: varchar('subname_loc4', { length: 100 }),
	subname_loc5: varchar('subname_loc5', { length: 100 }),
	subname_loc6: varchar('subname_loc6', { length: 100 }),
	subname_loc7: varchar('subname_loc7', { length: 100 }),
	subname_loc8: varchar('subname_loc8', { length: 100 })
});

export const locales_faction = mysqlTable('locales_faction', {
	entry: int('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 256 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 256 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 256 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 256 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 256 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 256 }).default('').notNull(),
	description_loc1: varchar('description_loc1', { length: 512 })
		.default('')
		.notNull(),
	description_loc2: varchar('description_loc2', { length: 512 })
		.default('')
		.notNull(),
	description_loc3: varchar('description_loc3', { length: 512 })
		.default('')
		.notNull(),
	description_loc4: varchar('description_loc4', { length: 512 })
		.default('')
		.notNull(),
	description_loc5: varchar('description_loc5', { length: 512 })
		.default('')
		.notNull(),
	description_loc6: varchar('description_loc6', { length: 512 })
		.default('')
		.notNull()
});

export const locales_gameobject = mysqlTable('locales_gameobject', {
	entry: mediumint('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 100 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 100 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 100 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 100 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 100 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 100 }).default('').notNull(),
	name_loc7: varchar('name_loc7', { length: 100 }).default('').notNull(),
	name_loc8: varchar('name_loc8', { length: 100 }).default('').notNull()
});

export const locales_gossip_menu_option = mysqlTable(
	'locales_gossip_menu_option',
	{
		menu_id: smallint('menu_id').notNull(),
		id: smallint('id').notNull(),
		option_text_loc1: text('option_text_loc1'),
		option_text_loc2: text('option_text_loc2'),
		option_text_loc3: text('option_text_loc3'),
		option_text_loc4: text('option_text_loc4'),
		option_text_loc5: text('option_text_loc5'),
		option_text_loc6: text('option_text_loc6'),
		option_text_loc7: text('option_text_loc7'),
		option_text_loc8: text('option_text_loc8'),
		box_text_loc1: text('box_text_loc1'),
		box_text_loc2: text('box_text_loc2'),
		box_text_loc3: text('box_text_loc3'),
		box_text_loc4: text('box_text_loc4'),
		box_text_loc5: text('box_text_loc5'),
		box_text_loc6: text('box_text_loc6'),
		box_text_loc7: text('box_text_loc7'),
		box_text_loc8: text('box_text_loc8')
	}
);

export const locales_item = mysqlTable('locales_item', {
	entry: mediumint('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 100 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 100 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 100 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 100 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 100 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 100 }).default('').notNull(),
	name_loc7: varchar('name_loc7', { length: 100 }).default('').notNull(),
	name_loc8: varchar('name_loc8', { length: 100 }).default('').notNull(),
	description_loc1: varchar('description_loc1', { length: 255 }),
	description_loc2: varchar('description_loc2', { length: 255 }),
	description_loc3: varchar('description_loc3', { length: 255 }),
	description_loc4: varchar('description_loc4', { length: 255 }),
	description_loc5: varchar('description_loc5', { length: 255 }),
	description_loc6: varchar('description_loc6', { length: 255 }),
	description_loc7: varchar('description_loc7', { length: 255 }),
	description_loc8: varchar('description_loc8', { length: 255 })
});

export const locales_page_text = mysqlTable('locales_page_text', {
	entry: mediumint('entry').notNull(),
	Text_loc1: longtext('Text_loc1'),
	Text_loc2: longtext('Text_loc2'),
	Text_loc3: longtext('Text_loc3'),
	Text_loc4: longtext('Text_loc4'),
	Text_loc5: longtext('Text_loc5'),
	Text_loc6: longtext('Text_loc6'),
	Text_loc7: longtext('Text_loc7'),
	Text_loc8: longtext('Text_loc8')
});

export const locales_points_of_interest = mysqlTable(
	'locales_points_of_interest',
	{
		entry: mediumint('entry').notNull(),
		icon_name_loc1: text('icon_name_loc1'),
		icon_name_loc2: text('icon_name_loc2'),
		icon_name_loc3: text('icon_name_loc3'),
		icon_name_loc4: text('icon_name_loc4'),
		icon_name_loc5: text('icon_name_loc5'),
		icon_name_loc6: text('icon_name_loc6'),
		icon_name_loc7: text('icon_name_loc7'),
		icon_name_loc8: text('icon_name_loc8')
	}
);

export const locales_quest = mysqlTable('locales_quest', {
	entry: mediumint('entry').notNull(),
	Title_loc1: text('Title_loc1'),
	Title_loc2: text('Title_loc2'),
	Title_loc3: text('Title_loc3'),
	Title_loc4: text('Title_loc4'),
	Title_loc5: text('Title_loc5'),
	Title_loc6: text('Title_loc6'),
	Title_loc7: text('Title_loc7'),
	Title_loc8: text('Title_loc8'),
	Details_loc1: text('Details_loc1'),
	Details_loc2: text('Details_loc2'),
	Details_loc3: text('Details_loc3'),
	Details_loc4: text('Details_loc4'),
	Details_loc5: text('Details_loc5'),
	Details_loc6: text('Details_loc6'),
	Details_loc7: text('Details_loc7'),
	Details_loc8: text('Details_loc8'),
	Objectives_loc1: text('Objectives_loc1'),
	Objectives_loc2: text('Objectives_loc2'),
	Objectives_loc3: text('Objectives_loc3'),
	Objectives_loc4: text('Objectives_loc4'),
	Objectives_loc5: text('Objectives_loc5'),
	Objectives_loc6: text('Objectives_loc6'),
	Objectives_loc7: text('Objectives_loc7'),
	Objectives_loc8: text('Objectives_loc8'),
	OfferRewardText_loc1: text('OfferRewardText_loc1'),
	OfferRewardText_loc2: text('OfferRewardText_loc2'),
	OfferRewardText_loc3: text('OfferRewardText_loc3'),
	OfferRewardText_loc4: text('OfferRewardText_loc4'),
	OfferRewardText_loc5: text('OfferRewardText_loc5'),
	OfferRewardText_loc6: text('OfferRewardText_loc6'),
	OfferRewardText_loc7: text('OfferRewardText_loc7'),
	OfferRewardText_loc8: text('OfferRewardText_loc8'),
	RequestItemsText_loc1: text('RequestItemsText_loc1'),
	RequestItemsText_loc2: text('RequestItemsText_loc2'),
	RequestItemsText_loc3: text('RequestItemsText_loc3'),
	RequestItemsText_loc4: text('RequestItemsText_loc4'),
	RequestItemsText_loc5: text('RequestItemsText_loc5'),
	RequestItemsText_loc6: text('RequestItemsText_loc6'),
	RequestItemsText_loc7: text('RequestItemsText_loc7'),
	RequestItemsText_loc8: text('RequestItemsText_loc8'),
	EndText_loc1: text('EndText_loc1'),
	EndText_loc2: text('EndText_loc2'),
	EndText_loc3: text('EndText_loc3'),
	EndText_loc4: text('EndText_loc4'),
	EndText_loc5: text('EndText_loc5'),
	EndText_loc6: text('EndText_loc6'),
	EndText_loc7: text('EndText_loc7'),
	EndText_loc8: text('EndText_loc8'),
	ObjectiveText1_loc1: text('ObjectiveText1_loc1'),
	ObjectiveText1_loc2: text('ObjectiveText1_loc2'),
	ObjectiveText1_loc3: text('ObjectiveText1_loc3'),
	ObjectiveText1_loc4: text('ObjectiveText1_loc4'),
	ObjectiveText1_loc5: text('ObjectiveText1_loc5'),
	ObjectiveText1_loc6: text('ObjectiveText1_loc6'),
	ObjectiveText1_loc7: text('ObjectiveText1_loc7'),
	ObjectiveText1_loc8: text('ObjectiveText1_loc8'),
	ObjectiveText2_loc1: text('ObjectiveText2_loc1'),
	ObjectiveText2_loc2: text('ObjectiveText2_loc2'),
	ObjectiveText2_loc3: text('ObjectiveText2_loc3'),
	ObjectiveText2_loc4: text('ObjectiveText2_loc4'),
	ObjectiveText2_loc5: text('ObjectiveText2_loc5'),
	ObjectiveText2_loc6: text('ObjectiveText2_loc6'),
	ObjectiveText2_loc7: text('ObjectiveText2_loc7'),
	ObjectiveText2_loc8: text('ObjectiveText2_loc8'),
	ObjectiveText3_loc1: text('ObjectiveText3_loc1'),
	ObjectiveText3_loc2: text('ObjectiveText3_loc2'),
	ObjectiveText3_loc3: text('ObjectiveText3_loc3'),
	ObjectiveText3_loc4: text('ObjectiveText3_loc4'),
	ObjectiveText3_loc5: text('ObjectiveText3_loc5'),
	ObjectiveText3_loc6: text('ObjectiveText3_loc6'),
	ObjectiveText3_loc7: text('ObjectiveText3_loc7'),
	ObjectiveText3_loc8: text('ObjectiveText3_loc8'),
	ObjectiveText4_loc1: text('ObjectiveText4_loc1'),
	ObjectiveText4_loc2: text('ObjectiveText4_loc2'),
	ObjectiveText4_loc3: text('ObjectiveText4_loc3'),
	ObjectiveText4_loc4: text('ObjectiveText4_loc4'),
	ObjectiveText4_loc5: text('ObjectiveText4_loc5'),
	ObjectiveText4_loc6: text('ObjectiveText4_loc6'),
	ObjectiveText4_loc7: text('ObjectiveText4_loc7'),
	ObjectiveText4_loc8: text('ObjectiveText4_loc8')
});

export const locales_spell = mysqlTable('locales_spell', {
	entry: int('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 256 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 256 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 256 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 256 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 256 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 256 }).default('').notNull(),
	nameSubtext_loc1: varchar('nameSubtext_loc1', { length: 256 })
		.default('')
		.notNull(),
	nameSubtext_loc2: varchar('nameSubtext_loc2', { length: 256 })
		.default('')
		.notNull(),
	nameSubtext_loc3: varchar('nameSubtext_loc3', { length: 256 })
		.default('')
		.notNull(),
	nameSubtext_loc4: varchar('nameSubtext_loc4', { length: 256 })
		.default('')
		.notNull(),
	nameSubtext_loc5: varchar('nameSubtext_loc5', { length: 256 })
		.default('')
		.notNull(),
	nameSubtext_loc6: varchar('nameSubtext_loc6', { length: 256 })
		.default('')
		.notNull(),
	description_loc1: varchar('description_loc1', { length: 1024 })
		.default('')
		.notNull(),
	description_loc2: varchar('description_loc2', { length: 1024 })
		.default('')
		.notNull(),
	description_loc3: varchar('description_loc3', { length: 1024 })
		.default('')
		.notNull(),
	description_loc4: varchar('description_loc4', { length: 1024 })
		.default('')
		.notNull(),
	description_loc5: varchar('description_loc5', { length: 1024 })
		.default('')
		.notNull(),
	description_loc6: varchar('description_loc6', { length: 1024 })
		.default('')
		.notNull(),
	auraDescription_loc1: varchar('auraDescription_loc1', { length: 512 })
		.default('')
		.notNull(),
	auraDescription_loc2: varchar('auraDescription_loc2', { length: 512 })
		.default('')
		.notNull(),
	auraDescription_loc3: varchar('auraDescription_loc3', { length: 512 })
		.default('')
		.notNull(),
	auraDescription_loc4: varchar('auraDescription_loc4', { length: 512 })
		.default('')
		.notNull(),
	auraDescription_loc5: varchar('auraDescription_loc5', { length: 512 })
		.default('')
		.notNull(),
	auraDescription_loc6: varchar('auraDescription_loc6', { length: 512 })
		.default('')
		.notNull()
});

export const locales_taxi_node = mysqlTable('locales_taxi_node', {
	entry: int('entry').notNull(),
	name_loc1: varchar('name_loc1', { length: 256 }).default('').notNull(),
	name_loc2: varchar('name_loc2', { length: 256 }).default('').notNull(),
	name_loc3: varchar('name_loc3', { length: 256 }).default('').notNull(),
	name_loc4: varchar('name_loc4', { length: 256 }).default('').notNull(),
	name_loc5: varchar('name_loc5', { length: 256 }).default('').notNull(),
	name_loc6: varchar('name_loc6', { length: 256 }).default('').notNull()
});

export const mail_loot_template = mysqlTable('mail_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const mail_text_template = mysqlTable('mail_text_template', {
	entry: mediumint('entry').notNull(),
	content_default: mediumtext('content_default').notNull(),
	content_loc1: mediumtext('content_loc1'),
	content_loc2: mediumtext('content_loc2'),
	content_loc3: mediumtext('content_loc3'),
	content_loc4: mediumtext('content_loc4'),
	content_loc5: mediumtext('content_loc5'),
	content_loc6: mediumtext('content_loc6'),
	content_loc7: mediumtext('content_loc7')
});

export const mangos_string = mysqlTable('mangos_string', {
	entry: mediumint('entry').notNull(),
	content_default: text('content_default').notNull(),
	content_loc1: text('content_loc1'),
	content_loc2: text('content_loc2'),
	content_loc3: text('content_loc3'),
	content_loc4: text('content_loc4'),
	content_loc5: text('content_loc5'),
	content_loc6: text('content_loc6'),
	content_loc7: text('content_loc7'),
	content_loc8: text('content_loc8')
});

export const map_loot_disabled = mysqlTable('map_loot_disabled', {
	map_id: int('map_id').default(0).notNull(),
	comment: varchar('comment', { length: 255 })
});

export const map_template = mysqlTable('map_template', {
	entry: smallint('entry').notNull(),
	parent: int('parent').default(0).notNull(),
	map_type: tinyint('map_type').default(0).notNull(),
	linked_zone: int('linked_zone').default(0).notNull(),
	player_limit: tinyint('player_limit').default(0).notNull(),
	reset_delay: int('reset_delay').default(0).notNull(),
	ghost_entrance_map: smallint('ghost_entrance_map').default(-1).notNull(),
	ghost_entrance_x: float('ghost_entrance_x').notNull(),
	ghost_entrance_y: float('ghost_entrance_y').notNull(),
	map_name: varchar('map_name', { length: 128 }).default('').notNull(),
	script_name: varchar('script_name', { length: 128 }).default('').notNull()
});

export const migrations = mysqlTable('migrations', {
	Id: int('Id').autoincrement().notNull(),
	Name: varchar('Name', { length: 255 }).default('0').notNull(),
	Hash: varchar('Hash', { length: 128 }).default('0').notNull(),
	AppliedAt: datetime('AppliedAt', { mode: 'string' }).notNull()
});

export const miraclerace_checkpoint = mysqlTable('miraclerace_checkpoint', {
	id: int('id').notNull(),
	raceid: int('raceid').notNull(),
	positionx: float('positionx').notNull(),
	positiony: float('positiony').notNull(),
	positionz: float('positionz').notNull(),
	cameraposx: float('cameraposx').notNull(),
	cameraposy: float('cameraposy').notNull(),
	cameraposz: float('cameraposz').notNull(),
	cameraposorientation: float('cameraposorientation').notNull()
});

export const miraclerace_creaturespool = mysqlTable(
	'miraclerace_creaturespool',
	{
		raceid: int('raceid').notNull(),
		entry: int('entry').notNull(),
		chance: int('chance').notNull(),
		positionx: float('positionx').notNull(),
		positiony: float('positiony').notNull(),
		positionz: float('positionz').notNull()
	}
);

export const miraclerace_gameobject = mysqlTable('miraclerace_gameobject', {
	raceid: int('raceid').notNull(),
	entry: int('entry').notNull(),
	chance: int('chance').notNull(),
	positionx: float('positionx').notNull(),
	positiony: float('positiony').notNull(),
	positionz: float('positionz').notNull()
});

export const mount_spells = mysqlTable('mount_spells', {
	itemId: int('itemId').notNull(),
	spellId: int('spellId').notNull()
});

export const npc_gossip = mysqlTable('npc_gossip', {
	npc_guid: int('npc_guid').default(0).notNull(),
	textid: mediumint('textid').notNull()
});

export const npc_text = mysqlTable('npc_text', {
	ID: mediumint('ID').notNull(),
	BroadcastTextID0: mediumint('BroadcastTextID0').notNull(),
	Probability0: float('Probability0').notNull(),
	BroadcastTextID1: mediumint('BroadcastTextID1').notNull(),
	Probability1: float('Probability1').notNull(),
	BroadcastTextID2: mediumint('BroadcastTextID2').notNull(),
	Probability2: float('Probability2').notNull(),
	BroadcastTextID3: mediumint('BroadcastTextID3').notNull(),
	Probability3: float('Probability3').notNull(),
	BroadcastTextID4: mediumint('BroadcastTextID4').notNull(),
	Probability4: float('Probability4').notNull(),
	BroadcastTextID5: mediumint('BroadcastTextID5').notNull(),
	Probability5: float('Probability5').notNull(),
	BroadcastTextID6: mediumint('BroadcastTextID6').notNull(),
	Probability6: float('Probability6').notNull(),
	BroadcastTextID7: mediumint('BroadcastTextID7').notNull(),
	Probability7: float('Probability7').notNull()
});

export const npc_trainer = mysqlTable(
	'npc_trainer',
	{
		entry: mediumint('entry').notNull(),
		spell: mediumint('spell').notNull(),
		spellcost: int('spellcost').default(0).notNull(),
		reqskill: smallint('reqskill').notNull(),
		reqskillvalue: smallint('reqskillvalue').notNull(),
		reqlevel: tinyint('reqlevel').default(0).notNull()
	},
	table => ({
		entry_spell: unique('entry_spell').on(table.entry, table.spell)
	})
);

export const npc_trainer_greeting = mysqlTable('npc_trainer_greeting', {
	entry: int('entry').default(0).notNull(),
	content_default: text('content_default').notNull(),
	content_loc1: text('content_loc1').notNull(),
	content_loc2: text('content_loc2').notNull(),
	content_loc3: text('content_loc3').notNull(),
	content_loc4: text('content_loc4').notNull(),
	content_loc5: text('content_loc5').notNull(),
	content_loc6: text('content_loc6').notNull(),
	content_loc7: text('content_loc7').notNull(),
	content_loc8: text('content_loc8').notNull()
});

export const npc_trainer_template = mysqlTable(
	'npc_trainer_template',
	{
		entry: mediumint('entry').notNull(),
		spell: mediumint('spell').notNull(),
		spellcost: int('spellcost').default(0).notNull(),
		reqskill: smallint('reqskill').notNull(),
		reqskillvalue: smallint('reqskillvalue').notNull(),
		reqlevel: tinyint('reqlevel').default(0).notNull()
	},
	table => ({
		entry_spell: unique('entry_spell').on(table.entry, table.spell)
	})
);

export const npc_vendor = mysqlTable('npc_vendor', {
	entry: mediumint('entry').notNull(),
	slot: smallint('slot').notNull(),
	item: mediumint('item').notNull(),
	maxcount: tinyint('maxcount').default(0).notNull(),
	incrtime: int('incrtime').default(0).notNull(),
	itemflags: int('itemflags').default(0).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const npc_vendor_template = mysqlTable('npc_vendor_template', {
	entry: mediumint('entry').notNull(),
	slot: smallint('slot').notNull(),
	item: mediumint('item').notNull(),
	maxcount: tinyint('maxcount').default(0).notNull(),
	incrtime: int('incrtime').default(0).notNull(),
	itemflags: int('itemflags').default(0).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const object_scaling = mysqlTable('object_scaling', {
	fullGuid: bigint('fullGuid', { mode: 'number' }).notNull(),
	scale: float('scale').notNull()
});

export const page_text = mysqlTable('page_text', {
	entry: mediumint('entry').notNull(),
	text: longtext('text').notNull(),
	next_page: mediumint('next_page').notNull()
});

export const petcreateinfo_spell = mysqlTable('petcreateinfo_spell', {
	entry: mediumint('entry').notNull(),
	spell1: mediumint('spell1').notNull(),
	spell2: mediumint('spell2').notNull(),
	spell3: mediumint('spell3').notNull(),
	spell4: mediumint('spell4').notNull()
});

export const pet_levelstats = mysqlTable('pet_levelstats', {
	creature_entry: mediumint('creature_entry').notNull(),
	level: tinyint('level').notNull(),
	hp: smallint('hp').notNull(),
	mana: smallint('mana').notNull(),
	armor: int('armor').default(0).notNull(),
	str: smallint('str').notNull(),
	agi: smallint('agi').notNull(),
	sta: smallint('sta').notNull(),
	inte: smallint('inte').notNull(),
	spi: smallint('spi').notNull()
});

export const pet_name_generation = mysqlTable('pet_name_generation', {
	id: mediumint('id').autoincrement().notNull(),
	word: tinytext('word').notNull(),
	entry: mediumint('entry').notNull(),
	half: tinyint('half').default(0).notNull()
});

export const pet_spell_data = mysqlTable('pet_spell_data', {
	entry: int('entry').notNull(),
	spell_id1: smallint('spell_id1').notNull(),
	spell_id2: smallint('spell_id2').notNull(),
	spell_id3: smallint('spell_id3').notNull(),
	spell_id4: smallint('spell_id4').notNull()
});

export const pickpocketing_loot_template = mysqlTable(
	'pickpocketing_loot_template',
	{
		entry: mediumint('entry').notNull(),
		item: mediumint('item').notNull(),
		ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
		groupid: tinyint('groupid').default(0).notNull(),
		mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
		maxcount: tinyint('maxcount').default(1).notNull(),
		condition_id: mediumint('condition_id').notNull()
	}
);

export const playerbot = mysqlTable('playerbot', {
	char_guid: bigint('char_guid', { mode: 'number' }).notNull(),
	chance: int('chance').default(10).notNull(),
	comment: varchar('comment', { length: 255 })
});

export const playercreateinfo = mysqlTable('playercreateinfo', {
	race: tinyint('race').default(0).notNull(),
	class: tinyint('class').default(0).notNull(),
	map: smallint('map').notNull(),
	zone: mediumint('zone').notNull(),
	position_x: float('position_x').notNull(),
	position_y: float('position_y').notNull(),
	position_z: float('position_z').notNull(),
	orientation: float('orientation').notNull()
});

export const playercreateinfo_action = mysqlTable(
	'playercreateinfo_action',
	{
		race: tinyint('race').default(0).notNull(),
		class: tinyint('class').default(0).notNull(),
		button: smallint('button').notNull(),
		action: int('action').default(0).notNull(),
		type: smallint('type').notNull()
	},
	table => ({
		playercreateinfo_race_class_idx: index(
			'playercreateinfo_race_class_index'
		).on(table.race, table.class)
	})
);

export const playercreateinfo_item = mysqlTable(
	'playercreateinfo_item',
	{
		race: tinyint('race').default(0).notNull(),
		class: tinyint('class').default(0).notNull(),
		itemid: mediumint('itemid').notNull(),
		amount: tinyint('amount').default(1).notNull()
	},
	table => ({
		playercreateinfo_race_class_idx: index(
			'playercreateinfo_race_class_index'
		).on(table.race, table.class)
	})
);

export const playercreateinfo_spell = mysqlTable('playercreateinfo_spell', {
	race: tinyint('race').default(0).notNull(),
	class: tinyint('class').default(0).notNull(),
	spell: mediumint('spell').notNull(),
	note: varchar('note', { length: 255 })
});

export const player_census = mysqlTable('player_census', {
	id: int('id').autoincrement().notNull(),
	alliance_players: int('alliance_players').notNull(),
	horde_players: int('horde_players').notNull(),
	total_players: int('total_players').notNull(),
	date_time: datetime('date_time', { mode: 'string' }).notNull()
});

export const player_classlevelstats = mysqlTable('player_classlevelstats', {
	class: tinyint('class').notNull(),
	level: tinyint('level').notNull(),
	basehp: smallint('basehp').notNull(),
	basemana: smallint('basemana').notNull()
});

export const player_factionchange_items = mysqlTable(
	'player_factionchange_items',
	{
		alliance_id: int('alliance_id').notNull(),
		horde_id: int('horde_id').notNull(),
		comment: varchar('comment', { length: 255 }).default('').notNull()
	}
);

export const player_factionchange_mounts = mysqlTable(
	'player_factionchange_mounts',
	{
		RaceId: int('RaceId').notNull(),
		MountNum: int('MountNum').notNull(),
		ItemEntry: int('ItemEntry').notNull(),
		Comment: varchar('Comment', { length: 255 }).default('').notNull()
	}
);

export const player_factionchange_quests = mysqlTable(
	'player_factionchange_quests',
	{
		alliance_id: int('alliance_id').notNull(),
		horde_id: int('horde_id').notNull(),
		comment: varchar('comment', { length: 255 }).default('').notNull()
	}
);

export const player_factionchange_reputations = mysqlTable(
	'player_factionchange_reputations',
	{
		alliance_id: int('alliance_id').notNull(),
		horde_id: int('horde_id').notNull()
	}
);

export const player_factionchange_spells = mysqlTable(
	'player_factionchange_spells',
	{
		alliance_id: int('alliance_id').notNull(),
		horde_id: int('horde_id').notNull(),
		comment: varchar('comment', { length: 255 }).default('').notNull()
	}
);

export const player_levelstats = mysqlTable('player_levelstats', {
	race: tinyint('race').notNull(),
	class: tinyint('class').notNull(),
	level: tinyint('level').notNull(),
	str: tinyint('str').notNull(),
	agi: tinyint('agi').notNull(),
	sta: tinyint('sta').notNull(),
	inte: tinyint('inte').notNull(),
	spi: tinyint('spi').notNull()
});

export const player_xp_for_level = mysqlTable('player_xp_for_level', {
	lvl: int('lvl').notNull(),
	xp_for_next_level: int('xp_for_next_level').notNull()
});

export const points_of_interest = mysqlTable('points_of_interest', {
	entry: mediumint('entry').notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	icon: mediumint('icon').notNull(),
	flags: mediumint('flags').notNull(),
	data: mediumint('data').notNull(),
	icon_name: text('icon_name').notNull()
});

export const pool_creature = mysqlTable(
	'pool_creature',
	{
		guid: int('guid').default(0).notNull(),
		pool_entry: mediumint('pool_entry').notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("chance").notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		flags: int('flags').default(0).notNull()
	},
	table => ({
		pool_idx: index('pool_idx').on(table.pool_entry)
	})
);

export const pool_creature_template = mysqlTable(
	'pool_creature_template',
	{
		id: int('id').default(0).notNull(),
		pool_entry: mediumint('pool_entry').notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("chance").notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		flags: int('flags').default(0).notNull()
	},
	table => ({
		pool_idx: index('pool_idx').on(table.pool_entry)
	})
);

export const pool_gameobject = mysqlTable(
	'pool_gameobject',
	{
		guid: int('guid').default(0).notNull(),
		pool_entry: mediumint('pool_entry').notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("chance").notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		flags: int('flags').default(0).notNull()
	},
	table => ({
		pool_idx: index('pool_idx').on(table.pool_entry)
	})
);

export const pool_gameobject_template = mysqlTable(
	'pool_gameobject_template',
	{
		id: int('id').default(0).notNull(),
		pool_entry: mediumint('pool_entry').notNull(),
		// Warning: Can't parse float unsigned from database
		// float unsignedType: float unsigned("chance").notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		flags: int('flags').default(0).notNull()
	},
	table => ({
		pool_idx: index('pool_idx').on(table.pool_entry)
	})
);

export const pool_pool = mysqlTable(
	'pool_pool',
	{
		pool_id: mediumint('pool_id').notNull(),
		mother_pool: mediumint('mother_pool').notNull(),
		chance: float('chance').notNull(),
		description: varchar('description', { length: 255 }).notNull(),
		flags: int('flags').default(0).notNull()
	},
	table => ({
		pool_idx: index('pool_idx').on(table.mother_pool)
	})
);

export const pool_template = mysqlTable('pool_template', {
	entry: mediumint('entry').notNull(),
	max_limit: int('max_limit').default(0).notNull(),
	description: varchar('description', { length: 255 }).notNull(),
	flags: int('flags').default(0).notNull(),
	instance: mediumint('instance').notNull()
});

export const quest_end_scripts = mysqlTable('quest_end_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const quest_greeting = mysqlTable('quest_greeting', {
	entry: mediumint('entry').notNull(),
	type: tinyint('type').default(0).notNull(),
	content_default: text('content_default').notNull(),
	content_loc1: text('content_loc1'),
	content_loc2: text('content_loc2'),
	content_loc3: text('content_loc3'),
	content_loc4: text('content_loc4'),
	content_loc5: text('content_loc5'),
	content_loc6: text('content_loc6'),
	content_loc7: text('content_loc7'),
	content_loc8: text('content_loc8'),
	emote_id: smallint('emote_id').notNull(),
	emote_delay: int('emote_delay').default(0).notNull()
});

export const quest_start_scripts = mysqlTable('quest_start_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const quest_template = mysqlTable('quest_template', {
	entry: mediumint('entry').notNull(),
	Method: tinyint('Method').default(2).notNull(),
	ZoneOrSort: smallint('ZoneOrSort').notNull(),
	MinLevel: tinyint('MinLevel').default(0).notNull(),
	MaxLevel: tinyint('MaxLevel').default(0).notNull(),
	QuestLevel: tinyint('QuestLevel').default(0).notNull(),
	Type: smallint('Type').notNull(),
	RequiredClasses: smallint('RequiredClasses').notNull(),
	RequiredRaces: smallint('RequiredRaces').notNull(),
	RequiredSkill: smallint('RequiredSkill').notNull(),
	RequiredSkillValue: smallint('RequiredSkillValue').notNull(),
	RepObjectiveFaction: smallint('RepObjectiveFaction').notNull(),
	RepObjectiveValue: mediumint('RepObjectiveValue').notNull(),
	RequiredMinRepFaction: smallint('RequiredMinRepFaction').notNull(),
	RequiredMinRepValue: mediumint('RequiredMinRepValue').notNull(),
	RequiredMaxRepFaction: smallint('RequiredMaxRepFaction').notNull(),
	RequiredMaxRepValue: mediumint('RequiredMaxRepValue').notNull(),
	SuggestedPlayers: tinyint('SuggestedPlayers').default(0).notNull(),
	LimitTime: int('LimitTime').default(0).notNull(),
	QuestFlags: smallint('QuestFlags').notNull(),
	SpecialFlags: tinyint('SpecialFlags').default(0).notNull(),
	PrevQuestId: mediumint('PrevQuestId').notNull(),
	NextQuestId: mediumint('NextQuestId').notNull(),
	ExclusiveGroup: mediumint('ExclusiveGroup').notNull(),
	NextQuestInChain: mediumint('NextQuestInChain').notNull(),
	SrcItemId: mediumint('SrcItemId').notNull(),
	SrcItemCount: tinyint('SrcItemCount').default(0).notNull(),
	SrcSpell: mediumint('SrcSpell').notNull(),
	Title: text('Title'),
	Details: text('Details'),
	Objectives: text('Objectives'),
	OfferRewardText: text('OfferRewardText'),
	RequestItemsText: text('RequestItemsText'),
	EndText: text('EndText'),
	ObjectiveText1: text('ObjectiveText1'),
	ObjectiveText2: text('ObjectiveText2'),
	ObjectiveText3: text('ObjectiveText3'),
	ObjectiveText4: text('ObjectiveText4'),
	ReqItemId1: mediumint('ReqItemId1').notNull(),
	ReqItemId2: mediumint('ReqItemId2').notNull(),
	ReqItemId3: mediumint('ReqItemId3').notNull(),
	ReqItemId4: mediumint('ReqItemId4').notNull(),
	ReqItemCount1: smallint('ReqItemCount1').notNull(),
	ReqItemCount2: smallint('ReqItemCount2').notNull(),
	ReqItemCount3: smallint('ReqItemCount3').notNull(),
	ReqItemCount4: smallint('ReqItemCount4').notNull(),
	ReqSourceId1: mediumint('ReqSourceId1').notNull(),
	ReqSourceId2: mediumint('ReqSourceId2').notNull(),
	ReqSourceId3: mediumint('ReqSourceId3').notNull(),
	ReqSourceId4: mediumint('ReqSourceId4').notNull(),
	ReqSourceCount1: mediumint('ReqSourceCount1').notNull(),
	ReqSourceCount2: mediumint('ReqSourceCount2').notNull(),
	ReqSourceCount3: mediumint('ReqSourceCount3').notNull(),
	ReqSourceCount4: mediumint('ReqSourceCount4').notNull(),
	ReqCreatureOrGOId1: mediumint('ReqCreatureOrGOId1').notNull(),
	ReqCreatureOrGOId2: mediumint('ReqCreatureOrGOId2').notNull(),
	ReqCreatureOrGOId3: mediumint('ReqCreatureOrGOId3').notNull(),
	ReqCreatureOrGOId4: mediumint('ReqCreatureOrGOId4').notNull(),
	ReqCreatureOrGOCount1: smallint('ReqCreatureOrGOCount1').notNull(),
	ReqCreatureOrGOCount2: smallint('ReqCreatureOrGOCount2').notNull(),
	ReqCreatureOrGOCount3: smallint('ReqCreatureOrGOCount3').notNull(),
	ReqCreatureOrGOCount4: smallint('ReqCreatureOrGOCount4').notNull(),
	ReqSpellCast1: mediumint('ReqSpellCast1').notNull(),
	ReqSpellCast2: mediumint('ReqSpellCast2').notNull(),
	ReqSpellCast3: mediumint('ReqSpellCast3').notNull(),
	ReqSpellCast4: mediumint('ReqSpellCast4').notNull(),
	RewChoiceItemId1: mediumint('RewChoiceItemId1').notNull(),
	RewChoiceItemId2: mediumint('RewChoiceItemId2').notNull(),
	RewChoiceItemId3: mediumint('RewChoiceItemId3').notNull(),
	RewChoiceItemId4: mediumint('RewChoiceItemId4').notNull(),
	RewChoiceItemId5: mediumint('RewChoiceItemId5').notNull(),
	RewChoiceItemId6: mediumint('RewChoiceItemId6').notNull(),
	RewChoiceItemCount1: smallint('RewChoiceItemCount1').notNull(),
	RewChoiceItemCount2: smallint('RewChoiceItemCount2').notNull(),
	RewChoiceItemCount3: smallint('RewChoiceItemCount3').notNull(),
	RewChoiceItemCount4: smallint('RewChoiceItemCount4').notNull(),
	RewChoiceItemCount5: smallint('RewChoiceItemCount5').notNull(),
	RewChoiceItemCount6: smallint('RewChoiceItemCount6').notNull(),
	RewItemId1: mediumint('RewItemId1').notNull(),
	RewItemId2: mediumint('RewItemId2').notNull(),
	RewItemId3: mediumint('RewItemId3').notNull(),
	RewItemId4: mediumint('RewItemId4').notNull(),
	RewItemCount1: smallint('RewItemCount1').notNull(),
	RewItemCount2: smallint('RewItemCount2').notNull(),
	RewItemCount3: smallint('RewItemCount3').notNull(),
	RewItemCount4: smallint('RewItemCount4').notNull(),
	RewRepFaction1: smallint('RewRepFaction1').notNull(),
	RewRepFaction2: smallint('RewRepFaction2').notNull(),
	RewRepFaction3: smallint('RewRepFaction3').notNull(),
	RewRepFaction4: smallint('RewRepFaction4').notNull(),
	RewRepFaction5: smallint('RewRepFaction5').notNull(),
	RewRepValue1: mediumint('RewRepValue1').notNull(),
	RewRepValue2: mediumint('RewRepValue2').notNull(),
	RewRepValue3: mediumint('RewRepValue3').notNull(),
	RewRepValue4: mediumint('RewRepValue4').notNull(),
	RewRepValue5: mediumint('RewRepValue5').notNull(),
	RewXP: mediumint('RewXP').notNull(),
	RewOrReqMoney: int('RewOrReqMoney').default(0).notNull(),
	RewMoneyMaxLevel: int('RewMoneyMaxLevel').default(0).notNull(),
	RewSpell: mediumint('RewSpell').notNull(),
	RewSpellCast: mediumint('RewSpellCast').notNull(),
	RewMailTemplateId: mediumint('RewMailTemplateId').notNull(),
	RewMailDelaySecs: int('RewMailDelaySecs').default(0).notNull(),
	RewMailMoney: int('RewMailMoney').default(0).notNull(),
	PointMapId: smallint('PointMapId').notNull(),
	PointX: float('PointX').notNull(),
	PointY: float('PointY').notNull(),
	PointOpt: mediumint('PointOpt').notNull(),
	DetailsEmote1: smallint('DetailsEmote1').notNull(),
	DetailsEmote2: smallint('DetailsEmote2').notNull(),
	DetailsEmote3: smallint('DetailsEmote3').notNull(),
	DetailsEmote4: smallint('DetailsEmote4').notNull(),
	DetailsEmoteDelay1: int('DetailsEmoteDelay1').default(0).notNull(),
	DetailsEmoteDelay2: int('DetailsEmoteDelay2').default(0).notNull(),
	DetailsEmoteDelay3: int('DetailsEmoteDelay3').default(0).notNull(),
	DetailsEmoteDelay4: int('DetailsEmoteDelay4').default(0).notNull(),
	IncompleteEmote: smallint('IncompleteEmote').notNull(),
	CompleteEmote: smallint('CompleteEmote').notNull(),
	OfferRewardEmote1: smallint('OfferRewardEmote1').notNull(),
	OfferRewardEmote2: smallint('OfferRewardEmote2').notNull(),
	OfferRewardEmote3: smallint('OfferRewardEmote3').notNull(),
	OfferRewardEmote4: smallint('OfferRewardEmote4').notNull(),
	OfferRewardEmoteDelay1: int('OfferRewardEmoteDelay1').default(0).notNull(),
	OfferRewardEmoteDelay2: int('OfferRewardEmoteDelay2').default(0).notNull(),
	OfferRewardEmoteDelay3: int('OfferRewardEmoteDelay3').default(0).notNull(),
	OfferRewardEmoteDelay4: int('OfferRewardEmoteDelay4').default(0).notNull(),
	StartScript: mediumint('StartScript').notNull(),
	CompleteScript: mediumint('CompleteScript').notNull()
});

export const reference_loot_template = mysqlTable('reference_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const reputation_reward_rate = mysqlTable('reputation_reward_rate', {
	faction: mediumint('faction').notNull(),
	quest_rate: float('quest_rate').default(1).notNull(),
	creature_rate: float('creature_rate').default(1).notNull(),
	spell_rate: float('spell_rate').default(1).notNull()
});

export const reputation_spillover_template = mysqlTable(
	'reputation_spillover_template',
	{
		faction: smallint('faction').notNull(),
		faction1: smallint('faction1').notNull(),
		rate_1: float('rate_1').notNull(),
		rank_1: tinyint('rank_1').default(0).notNull(),
		faction2: smallint('faction2').notNull(),
		rate_2: float('rate_2').notNull(),
		rank_2: tinyint('rank_2').default(0).notNull(),
		faction3: smallint('faction3').notNull(),
		rate_3: float('rate_3').notNull(),
		rank_3: tinyint('rank_3').default(0).notNull(),
		faction4: smallint('faction4').notNull(),
		rate_4: float('rate_4').notNull(),
		rank_4: tinyint('rank_4').default(0).notNull()
	}
);

export const reserved_name = mysqlTable('reserved_name', {
	name: varchar('name', { length: 12 }).default('').notNull()
});

export const scripted_areatrigger = mysqlTable('scripted_areatrigger', {
	entry: mediumint('entry').notNull(),
	script_name: char('script_name', { length: 64 }).notNull()
});

export const scripted_event_id = mysqlTable('scripted_event_id', {
	id: mediumint('id').notNull(),
	script_name: char('script_name', { length: 64 }).notNull()
});

export const script_escort_data = mysqlTable(
	'script_escort_data',
	{
		creature_id: int('creature_id'),
		quest: int('quest'),
		escort_faction: int('escort_faction')
	},
	table => ({
		creature_id: unique('creature_id').on(table.creature_id)
	})
);

export const script_texts = mysqlTable('script_texts', {
	entry: mediumint('entry').notNull(),
	content_default: text('content_default').notNull(),
	content_loc1: text('content_loc1'),
	content_loc2: text('content_loc2'),
	content_loc3: text('content_loc3'),
	content_loc4: text('content_loc4'),
	content_loc5: text('content_loc5'),
	content_loc6: text('content_loc6'),
	content_loc7: text('content_loc7'),
	content_loc8: text('content_loc8'),
	sound: mediumint('sound').notNull(),
	type: tinyint('type').default(0).notNull(),
	language: tinyint('language').default(0).notNull(),
	emote: smallint('emote').notNull(),
	comment: text('comment')
});

export const script_waypoint = mysqlTable('script_waypoint', {
	entry: mediumint('entry').notNull(),
	pointid: mediumint('pointid').notNull(),
	location_x: float('location_x').notNull(),
	location_y: float('location_y').notNull(),
	location_z: float('location_z').notNull(),
	waittime: int('waittime').default(0).notNull(),
	point_comment: text('point_comment')
});

export const shop_categories = mysqlTable('shop_categories', {
	id: int('id').autoincrement().notNull(),
	name: text('name'),
	icon: varchar('icon', { length: 32 }).default('default').notNull()
});

export const shop_items = mysqlTable('shop_items', {
	id: int('id').autoincrement().notNull(),
	category: tinyint('category').default(0).notNull(),
	item: int('item').default(0).notNull(),
	description: text('description'),
	price: int('price').default(0),
	descriptionLong: varchar('descriptionLong', { length: 1024 })
		.default('')
		.notNull()
});

export const skill_fishing_base_level = mysqlTable('skill_fishing_base_level', {
	entry: mediumint('entry').notNull(),
	skill: smallint('skill').notNull()
});

export const skill_line_ability = mysqlTable('skill_line_ability', {
	id: smallint('id').notNull(),
	skill_id: int('skill_id').default(0).notNull(),
	spell_id: int('spell_id').default(0).notNull(),
	race_mask: int('race_mask').default(0).notNull(),
	class_mask: int('class_mask').default(0).notNull(),
	req_skill_value: int('req_skill_value').default(0).notNull(),
	superseded_by_spell: int('superseded_by_spell').default(0).notNull(),
	learn_on_get_skill: int('learn_on_get_skill').default(0).notNull(),
	max_value: int('max_value').default(0).notNull(),
	min_value: int('min_value').default(0).notNull(),
	req_train_points: int('req_train_points').default(0).notNull()
});

export const skinning_loot_template = mysqlTable('skinning_loot_template', {
	entry: mediumint('entry').notNull(),
	item: mediumint('item').notNull(),
	ChanceOrQuestChance: float('ChanceOrQuestChance').default(100).notNull(),
	groupid: tinyint('groupid').default(0).notNull(),
	mincountOrRef: mediumint('mincountOrRef').default(1).notNull(),
	maxcount: tinyint('maxcount').default(1).notNull(),
	condition_id: mediumint('condition_id').notNull()
});

export const sound_entries = mysqlTable(
	'sound_entries',
	{
		id: int('id').default(0).notNull(),
		name: varchar('name', { length: 128 }).default('').notNull()
	},
	table => ({
		ID: unique('ID').on(table.id)
	})
);

export const spell_affect = mysqlTable('spell_affect', {
	entry: smallint('entry').notNull(),
	effectId: tinyint('effectId').default(0).notNull(),
	SpellFamilyMask: bigint('SpellFamilyMask', { mode: 'number' }).notNull()
});

export const spell_area = mysqlTable('spell_area', {
	spell: mediumint('spell').notNull(),
	area: mediumint('area').notNull(),
	quest_start: mediumint('quest_start').notNull(),
	quest_start_active: tinyint('quest_start_active').default(0).notNull(),
	quest_end: mediumint('quest_end').notNull(),
	aura_spell: mediumint('aura_spell').notNull(),
	racemask: mediumint('racemask').notNull(),
	gender: tinyint('gender').default(2).notNull(),
	autocast: tinyint('autocast').default(0).notNull()
});

export const spell_chain = mysqlTable('spell_chain', {
	spell_id: mediumint('spell_id').notNull(),
	prev_spell: mediumint('prev_spell').notNull(),
	first_spell: mediumint('first_spell').notNull(),
	rank: tinyint('rank').default(0).notNull(),
	req_spell: mediumint('req_spell').notNull()
});

export const spell_check = mysqlTable('spell_check', {
	spellid: mediumint('spellid').notNull(),
	SpellFamilyName: smallint('SpellFamilyName').default(-1).notNull(),
	SpellFamilyMask: bigint('SpellFamilyMask', { mode: 'number' })
		.default(-1)
		.notNull(),
	SpellIcon: int('SpellIcon').default(-1).notNull(),
	SpellVisual: int('SpellVisual').default(-1).notNull(),
	SpellCategory: int('SpellCategory').default(-1).notNull(),
	EffectType: int('EffectType').default(-1).notNull(),
	EffectAura: int('EffectAura').default(-1).notNull(),
	EffectIdx: tinyint('EffectIdx').default(-1).notNull(),
	Name: varchar('Name', { length: 40 }).default('').notNull(),
	Code: varchar('Code', { length: 40 }).default('').notNull()
});

export const spell_disabled = mysqlTable('spell_disabled', {
	entry: int('entry').notNull()
});

export const spell_effect_mod = mysqlTable('spell_effect_mod', {
	Id: int('Id').default(0).notNull(),
	EffectIndex: int('EffectIndex').default(0).notNull(),
	Effect: int('Effect').default(-1).notNull(),
	EffectDieSides: int('EffectDieSides').default(-1).notNull(),
	EffectBaseDice: int('EffectBaseDice').default(-1).notNull(),
	EffectDicePerLevel: float('EffectDicePerLevel').default(-1).notNull(),
	EffectRealPointsPerLevel: float('EffectRealPointsPerLevel')
		.default(-1)
		.notNull(),
	EffectBasePoints: int('EffectBasePoints').default(-1).notNull(),
	EffectAmplitude: int('EffectAmplitude').default(-1).notNull(),
	EffectPointsPerComboPoint: float('EffectPointsPerComboPoint')
		.default(-1)
		.notNull(),
	EffectChainTarget: int('EffectChainTarget').default(-1).notNull(),
	EffectMultipleValue: float('EffectMultipleValue').default(-1).notNull(),
	EffectMechanic: int('EffectMechanic').default(-1).notNull(),
	EffectImplicitTargetA: int('EffectImplicitTargetA').default(-1).notNull(),
	EffectImplicitTargetB: int('EffectImplicitTargetB').default(-1).notNull(),
	EffectRadiusIndex: int('EffectRadiusIndex').default(-1).notNull(),
	EffectApplyAuraName: int('EffectApplyAuraName').default(-1).notNull(),
	EffectItemType: int('EffectItemType').default(-1).notNull(),
	EffectMiscValue: int('EffectMiscValue').default(-1).notNull(),
	EffectTriggerSpell: int('EffectTriggerSpell').default(-1).notNull(),
	Comment: varchar('Comment', { length: 255 })
});

export const spell_elixir = mysqlTable('spell_elixir', {
	entry: int('entry').default(0).notNull(),
	mask: tinyint('mask').default(0).notNull()
});

export const spell_enchant_charges = mysqlTable('spell_enchant_charges', {
	entry: int('entry').notNull(),
	charges: int('charges').default(0).notNull()
});

export const spell_group = mysqlTable(
	'spell_group',
	{
		group_id: int('group_id').default(0).notNull(),
		group_spell_id: int('group_spell_id').default(0).notNull(),
		spell_id: int('spell_id').default(0).notNull()
	},
	table => ({
		group_id: unique('group_id').on(table.group_id, table.group_spell_id)
	})
);

export const spell_group_stack_rules = mysqlTable('spell_group_stack_rules', {
	group_id: int('group_id').default(0).notNull(),
	stack_rule: tinyint('stack_rule').default(1).notNull()
});

export const spell_learn_spell = mysqlTable('spell_learn_spell', {
	entry: smallint('entry').notNull(),
	SpellID: smallint('SpellID').notNull(),
	Active: tinyint('Active').default(1).notNull()
});

export const spell_mod = mysqlTable('spell_mod', {
	Id: int('Id').default(0).notNull(),
	procChance: int('procChance').default(-1),
	procFlags: int('procFlags').default(-1),
	procCharges: int('procCharges').default(-1),
	DurationIndex: int('DurationIndex').default(-1),
	Category: int('Category').default(-1),
	CastingTimeIndex: int('CastingTimeIndex').default(-1),
	StackAmount: int('StackAmount').default(-1),
	SpellIconID: int('SpellIconID').default(-1),
	activeIconID: int('activeIconID').default(-1),
	manaCost: int('manaCost').default(-1),
	Attributes: int('Attributes').default(-1),
	AttributesEx: int('AttributesEx').default(-1),
	AttributesEx2: int('AttributesEx2').default(-1),
	AttributesEx3: int('AttributesEx3').default(-1),
	AttributesEx4: int('AttributesEx4').default(-1),
	Custom: int('Custom').default(0),
	InterruptFlags: int('InterruptFlags').default(-1),
	AuraInterruptFlags: int('AuraInterruptFlags').default(-1),
	ChannelInterruptFlags: int('ChannelInterruptFlags').default(-1),
	Dispel: int('Dispel').default(-1).notNull(),
	Stances: int('Stances').default(-1),
	StancesNot: int('StancesNot').default(-1),
	SpellVisual: int('SpellVisual').default(-1),
	ManaCostPercentage: int('ManaCostPercentage').default(-1),
	StartRecoveryCategory: int('StartRecoveryCategory').default(-1),
	StartRecoveryTime: int('StartRecoveryTime').default(-1),
	MaxAffectedTargets: int('MaxAffectedTargets').default(-1),
	MaxTargetLevel: int('MaxTargetLevel').default(-1),
	DmgClass: int('DmgClass').default(-1),
	rangeIndex: int('rangeIndex').default(-1),
	RecoveryTime: int('RecoveryTime').default(-1).notNull(),
	CategoryRecoveryTime: int('CategoryRecoveryTime').default(-1).notNull(),
	SpellFamilyName: int('SpellFamilyName').default(-1).notNull(),
	SpellFamilyFlags: bigint('SpellFamilyFlags', { mode: 'number' }),
	Mechanic: int('Mechanic').default(-1),
	EquippedItemClass: int('EquippedItemClass').default(-1),
	Comment: varchar('Comment', { length: 255 })
});

export const spell_pet_auras = mysqlTable('spell_pet_auras', {
	spell: mediumint('spell').notNull(),
	pet: mediumint('pet').notNull(),
	aura: mediumint('aura').notNull()
});

export const spell_proc_event = mysqlTable('spell_proc_event', {
	entry: mediumint('entry').notNull(),
	SchoolMask: tinyint('SchoolMask').default(0).notNull(),
	SpellFamilyName: smallint('SpellFamilyName').notNull(),
	SpellFamilyMask0: bigint('SpellFamilyMask0', { mode: 'number' }).notNull(),
	SpellFamilyMask1: bigint('SpellFamilyMask1', { mode: 'number' }).notNull(),
	SpellFamilyMask2: bigint('SpellFamilyMask2', { mode: 'number' }).notNull(),
	procFlags: int('procFlags').default(0).notNull(),
	procEx: int('procEx').default(0).notNull(),
	ppmRate: float('ppmRate').notNull(),
	CustomChance: float('CustomChance').notNull(),
	Cooldown: int('Cooldown').default(0).notNull()
});

export const spell_proc_item_enchant = mysqlTable('spell_proc_item_enchant', {
	entry: mediumint('entry').notNull(),
	ppmRate: float('ppmRate').notNull()
});

export const spell_scripts = mysqlTable('spell_scripts', {
	id: mediumint('id').notNull(),
	delay: int('delay').default(0).notNull(),
	priority: tinyint('priority').default(0).notNull(),
	command: mediumint('command').notNull(),
	datalong: mediumint('datalong').notNull(),
	datalong2: int('datalong2').default(0).notNull(),
	datalong3: int('datalong3').default(0).notNull(),
	datalong4: int('datalong4').default(0).notNull(),
	target_param1: int('target_param1').default(0).notNull(),
	target_param2: int('target_param2').default(0).notNull(),
	target_type: tinyint('target_type').default(0).notNull(),
	data_flags: tinyint('data_flags').default(0).notNull(),
	dataint: int('dataint').default(0).notNull(),
	dataint2: int('dataint2').default(0).notNull(),
	dataint3: int('dataint3').default(0).notNull(),
	dataint4: int('dataint4').default(0).notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	o: float('o').notNull(),
	condition_id: mediumint('condition_id').notNull(),
	comments: varchar('comments', { length: 255 }).notNull()
});

export const spell_script_target = mysqlTable(
	'spell_script_target',
	{
		entry: mediumint('entry').notNull(),
		type: tinyint('type').default(0).notNull(),
		targetEntry: mediumint('targetEntry').notNull(),
		conditionId: mediumint('conditionId').notNull(),
		inverseEffectMask: mediumint('inverseEffectMask').notNull()
	},
	table => ({
		entry_type_target: unique('entry_type_target').on(
			table.entry,
			table.type,
			table.targetEntry
		)
	})
);

export const spell_target_position = mysqlTable('spell_target_position', {
	id: mediumint('id').notNull(),
	target_map: smallint('target_map').notNull(),
	target_position_x: float('target_position_x').notNull(),
	target_position_y: float('target_position_y').notNull(),
	target_position_z: float('target_position_z').notNull(),
	target_orientation: float('target_orientation').notNull()
});

export const spell_template = mysqlTable('spell_template', {
	entry: int('entry').default(0).notNull(),
	school: int('school').default(0).notNull(),
	category: int('category').default(0).notNull(),
	castUI: int('castUI').default(0).notNull(),
	dispel: int('dispel').default(0).notNull(),
	mechanic: int('mechanic').default(0).notNull(),
	attributes: int('attributes').default(0).notNull(),
	attributesEx: int('attributesEx').default(0).notNull(),
	attributesEx2: int('attributesEx2').default(0).notNull(),
	attributesEx3: int('attributesEx3').default(0).notNull(),
	attributesEx4: int('attributesEx4').default(0).notNull(),
	stances: int('stances').default(0).notNull(),
	stancesNot: int('stancesNot').default(0).notNull(),
	targets: int('targets').default(0).notNull(),
	targetCreatureType: int('targetCreatureType').default(0).notNull(),
	requiresSpellFocus: int('requiresSpellFocus').default(0).notNull(),
	casterAuraState: int('casterAuraState').default(0).notNull(),
	targetAuraState: int('targetAuraState').default(0).notNull(),
	castingTimeIndex: int('castingTimeIndex').default(0).notNull(),
	recoveryTime: int('recoveryTime').default(0).notNull(),
	categoryRecoveryTime: int('categoryRecoveryTime').default(0).notNull(),
	interruptFlags: int('interruptFlags').default(0).notNull(),
	auraInterruptFlags: int('auraInterruptFlags').default(0).notNull(),
	channelInterruptFlags: int('channelInterruptFlags').default(0).notNull(),
	procFlags: int('procFlags').default(0).notNull(),
	procChance: int('procChance').default(0).notNull(),
	procCharges: int('procCharges').default(0).notNull(),
	maxLevel: int('maxLevel').default(0).notNull(),
	baseLevel: int('baseLevel').default(0).notNull(),
	spellLevel: int('spellLevel').default(0).notNull(),
	durationIndex: int('durationIndex').default(0).notNull(),
	powerType: int('powerType').default(0).notNull(),
	manaCost: int('manaCost').default(0).notNull(),
	manCostPerLevel: int('manCostPerLevel').default(0).notNull(),
	manaPerSecond: int('manaPerSecond').default(0).notNull(),
	manaPerSecondPerLevel: int('manaPerSecondPerLevel').default(0).notNull(),
	rangeIndex: int('rangeIndex').default(0).notNull(),
	speed: float('speed').notNull(),
	modelNextSpell: int('modelNextSpell').default(0).notNull(),
	stackAmount: int('stackAmount').default(0).notNull(),
	totem1: int('totem1').default(0).notNull(),
	totem2: int('totem2').default(0).notNull(),
	reagent1: int('reagent1').default(0).notNull(),
	reagent2: int('reagent2').default(0).notNull(),
	reagent3: int('reagent3').default(0).notNull(),
	reagent4: int('reagent4').default(0).notNull(),
	reagent5: int('reagent5').default(0).notNull(),
	reagent6: int('reagent6').default(0).notNull(),
	reagent7: int('reagent7').default(0).notNull(),
	reagent8: int('reagent8').default(0).notNull(),
	reagentCount1: int('reagentCount1').default(0).notNull(),
	reagentCount2: int('reagentCount2').default(0).notNull(),
	reagentCount3: int('reagentCount3').default(0).notNull(),
	reagentCount4: int('reagentCount4').default(0).notNull(),
	reagentCount5: int('reagentCount5').default(0).notNull(),
	reagentCount6: int('reagentCount6').default(0).notNull(),
	reagentCount7: int('reagentCount7').default(0).notNull(),
	reagentCount8: int('reagentCount8').default(0).notNull(),
	equippedItemClass: int('equippedItemClass').default(0).notNull(),
	equippedItemSubClassMask: int('equippedItemSubClassMask')
		.default(0)
		.notNull(),
	equippedItemInventoryTypeMask: int('equippedItemInventoryTypeMask')
		.default(0)
		.notNull(),
	effect1: int('effect1').default(0).notNull(),
	effect2: int('effect2').default(0).notNull(),
	effect3: int('effect3').default(0).notNull(),
	effectDieSides1: int('effectDieSides1').default(0).notNull(),
	effectDieSides2: int('effectDieSides2').default(0).notNull(),
	effectDieSides3: int('effectDieSides3').default(0).notNull(),
	effectBaseDice1: int('effectBaseDice1').default(0).notNull(),
	effectBaseDice2: int('effectBaseDice2').default(0).notNull(),
	effectBaseDice3: int('effectBaseDice3').default(0).notNull(),
	effectDicePerLevel1: float('effectDicePerLevel1').notNull(),
	effectDicePerLevel2: float('effectDicePerLevel2').notNull(),
	effectDicePerLevel3: float('effectDicePerLevel3').notNull(),
	effectRealPointsPerLevel1: float('effectRealPointsPerLevel1').notNull(),
	effectRealPointsPerLevel2: float('effectRealPointsPerLevel2').notNull(),
	effectRealPointsPerLevel3: float('effectRealPointsPerLevel3').notNull(),
	effectBasePoints1: int('effectBasePoints1').default(0).notNull(),
	effectBasePoints2: int('effectBasePoints2').default(0).notNull(),
	effectBasePoints3: int('effectBasePoints3').default(0).notNull(),
	effectBonusCoefficient1: float('effectBonusCoefficient1')
		.default(-1)
		.notNull(),
	effectBonusCoefficient2: float('effectBonusCoefficient2')
		.default(-1)
		.notNull(),
	effectBonusCoefficient3: float('effectBonusCoefficient3')
		.default(-1)
		.notNull(),
	effectMechanic1: int('effectMechanic1').default(0).notNull(),
	effectMechanic2: int('effectMechanic2').default(0).notNull(),
	effectMechanic3: int('effectMechanic3').default(0).notNull(),
	effectImplicitTargetA1: int('effectImplicitTargetA1').default(0).notNull(),
	effectImplicitTargetA2: int('effectImplicitTargetA2').default(0).notNull(),
	effectImplicitTargetA3: int('effectImplicitTargetA3').default(0).notNull(),
	effectImplicitTargetB1: int('effectImplicitTargetB1').default(0).notNull(),
	effectImplicitTargetB2: int('effectImplicitTargetB2').default(0).notNull(),
	effectImplicitTargetB3: int('effectImplicitTargetB3').default(0).notNull(),
	effectRadiusIndex1: int('effectRadiusIndex1').default(0).notNull(),
	effectRadiusIndex2: int('effectRadiusIndex2').default(0).notNull(),
	effectRadiusIndex3: int('effectRadiusIndex3').default(0).notNull(),
	effectApplyAuraName1: int('effectApplyAuraName1').default(0).notNull(),
	effectApplyAuraName2: int('effectApplyAuraName2').default(0).notNull(),
	effectApplyAuraName3: int('effectApplyAuraName3').default(0).notNull(),
	effectAmplitude1: int('effectAmplitude1').default(0).notNull(),
	effectAmplitude2: int('effectAmplitude2').default(0).notNull(),
	effectAmplitude3: int('effectAmplitude3').default(0).notNull(),
	effectMultipleValue1: float('effectMultipleValue1').notNull(),
	effectMultipleValue2: float('effectMultipleValue2').notNull(),
	effectMultipleValue3: float('effectMultipleValue3').notNull(),
	effectChainTarget1: int('effectChainTarget1').default(0).notNull(),
	effectChainTarget2: int('effectChainTarget2').default(0).notNull(),
	effectChainTarget3: int('effectChainTarget3').default(0).notNull(),
	effectItemType1: int('effectItemType1').default(0).notNull(),
	effectItemType2: int('effectItemType2').default(0).notNull(),
	effectItemType3: int('effectItemType3').default(0).notNull(),
	effectMiscValue1: int('effectMiscValue1').default(0).notNull(),
	effectMiscValue2: int('effectMiscValue2').default(0).notNull(),
	effectMiscValue3: int('effectMiscValue3').default(0).notNull(),
	effectTriggerSpell1: int('effectTriggerSpell1').default(0).notNull(),
	effectTriggerSpell2: int('effectTriggerSpell2').default(0).notNull(),
	effectTriggerSpell3: int('effectTriggerSpell3').default(0).notNull(),
	effectPointsPerComboPoint1: float('effectPointsPerComboPoint1').notNull(),
	effectPointsPerComboPoint2: float('effectPointsPerComboPoint2').notNull(),
	effectPointsPerComboPoint3: float('effectPointsPerComboPoint3').notNull(),
	spellVisual1: int('spellVisual1').default(0).notNull(),
	spellVisual2: int('spellVisual2').default(0).notNull(),
	spellIconId: int('spellIconId').default(0).notNull(),
	activeIconId: int('activeIconId').default(0).notNull(),
	spellPriority: int('spellPriority').default(0).notNull(),
	name: varchar('name', { length: 256 }).default('').notNull(),
	nameFlags: int('nameFlags').default(0).notNull(),
	nameSubtext: varchar('nameSubtext', { length: 256 }).default('').notNull(),
	nameSubtextFlags: int('nameSubtextFlags').default(0).notNull(),
	description: varchar('description', { length: 1024 }).default('').notNull(),
	descriptionFlags: int('descriptionFlags').default(0).notNull(),
	auraDescription: varchar('auraDescription', { length: 512 })
		.default('')
		.notNull(),
	auraDescriptionFlags: int('auraDescriptionFlags').default(0).notNull(),
	manaCostPercentage: int('manaCostPercentage').default(0).notNull(),
	startRecoveryCategory: int('startRecoveryCategory').default(0).notNull(),
	startRecoveryTime: int('startRecoveryTime').default(0).notNull(),
	minTargetLevel: int('minTargetLevel').default(0).notNull(),
	maxTargetLevel: int('maxTargetLevel').default(0).notNull(),
	spellFamilyName: int('spellFamilyName').default(0).notNull(),
	spellFamilyFlags: bigint('spellFamilyFlags', { mode: 'number' }).notNull(),
	maxAffectedTargets: int('maxAffectedTargets').default(0).notNull(),
	dmgClass: int('dmgClass').default(0).notNull(),
	preventionType: int('preventionType').default(0).notNull(),
	stanceBarOrder: int('stanceBarOrder').default(0).notNull(),
	dmgMultiplier1: float('dmgMultiplier1').notNull(),
	dmgMultiplier2: float('dmgMultiplier2').notNull(),
	dmgMultiplier3: float('dmgMultiplier3').notNull(),
	minFactionId: int('minFactionId').default(0).notNull(),
	minReputation: int('minReputation').default(0).notNull(),
	requiredAuraVision: int('requiredAuraVision').default(0).notNull(),
	customFlags: int('customFlags').default(0).notNull()
});

export const spell_threat = mysqlTable('spell_threat', {
	entry: mediumint('entry').notNull(),
	Threat: smallint('Threat').notNull(),
	multiplier: float('multiplier').default(1).notNull(),
	ap_bonus: float('ap_bonus').notNull()
});

export const taxi_nodes = mysqlTable('taxi_nodes', {
	id: smallint('id').notNull(),
	map_id: mediumint('map_id').notNull(),
	x: float('x').notNull(),
	y: float('y').notNull(),
	z: float('z').notNull(),
	name: varchar('name', { length: 256 }).default('').notNull(),
	mount_creature_id1: smallint('mount_creature_id1').notNull(),
	mount_creature_id2: smallint('mount_creature_id2').notNull()
});

export const taxi_path_transitions = mysqlTable('taxi_path_transitions', {
	in_path: mediumint('in_path').notNull(),
	out_path: mediumint('out_path').notNull(),
	in_node: mediumint('in_node').notNull(),
	out_node: mediumint('out_node').notNull(),
	comment: text('comment')
});

export const transports = mysqlTable('transports', {
	guid: int('guid').default(0).notNull(),
	entry: mediumint('entry').notNull(),
	name: text('name'),
	period: mediumint('period').notNull()
});

export const variables = mysqlTable('variables', {
	index: int('index').default(0).notNull(),
	value: int('value').default(0).notNull()
});

export const warden_checks = mysqlTable('warden_checks', {
	id: smallint('id').autoincrement().notNull(),
	group_id: smallint('group_id').notNull(),
	type: tinyint('type'),
	data: varchar('data', { length: 48 }).default('').notNull(),
	str: varchar('str', { length: 20 }).default('').notNull(),
	address: int('address').default(0).notNull(),
	length: tinyint('length').default(0).notNull(),
	result: varchar('result', { length: 24 }).default('').notNull(),
	penalty: tinyint('penalty').default(-1).notNull(),
	comment: varchar('comment', { length: 50 }).default('')
});

export const warden_scans = mysqlTable(
	'warden_scans',
	{
		id: smallint('id').autoincrement().notNull(),
		type: int('type').default(0),
		str: text('str'),
		data: text('data'),
		address: int('address').default(0),
		length: int('length').default(0),
		result: tinytext('result').notNull(),
		flags: smallint('flags').notNull(),
		comment: tinytext('comment').notNull()
	},
	table => ({
		id: unique('id').on(table.id)
	})
);

export const world_safe_locs_facing = mysqlTable('world_safe_locs_facing', {
	id: int('id').notNull(),
	orientation: float('orientation').notNull()
});
