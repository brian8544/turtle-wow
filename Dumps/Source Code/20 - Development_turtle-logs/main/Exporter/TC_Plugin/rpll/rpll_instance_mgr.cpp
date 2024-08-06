#include "rpll_instance_mgr.h"

void RPLLInstanceMgrHooks::DeleteInstanceFromDB(const uint32_t instanceId)
{
    RPLLHooks::InstanceDelete(instanceId);
}