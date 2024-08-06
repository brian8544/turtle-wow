#ifndef _RPLL_IMGR_HOOKS_H
#define _RPLL_IMGR_HOOKS_H

#include "rpll_hooks.h"

class RPLLInstanceMgrHooks
{
public:
    static void DeleteInstanceFromDB(const uint32_t instanceId);
};

#endif