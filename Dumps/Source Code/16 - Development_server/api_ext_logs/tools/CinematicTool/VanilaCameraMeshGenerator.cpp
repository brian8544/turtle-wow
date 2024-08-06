// Giperion December 2020
// [EUREKA] 4.5
// Turtle Project Group
#include <iostream>
#include <cassert>
#include <vector>
#include <stdint.h>
#include <cfloat>
#include <string>
#include <windows.h>
#include <DirectXMath.h>

#undef min
#undef max
#include "vector3.h"

using uint32 = uint32_t;
using uint8 = uint8_t;
using int16 = int16_t;
using int32 = int32_t;

struct Vec3D
{
	float x;
	float y;
	float z;
};

enum class InterpolationMethod : int16
{
	None,
	Linear,
	Hermite
};

// sub-block in block E - animation data
struct AnimationBlock {
	InterpolationMethod type;		// interpolation type (0=none, 1=linear, 2=hermite)
	int16 seq;		// global sequence id or -1
	uint32 nRanges;
	uint32 ofsRanges;
	uint32 nTimes;
	uint32 ofsTimes;
	uint32 nKeys;
	uint32 ofsKeys;
};

struct ModelCameraDef {
	int32 id;
	float fov, farclip, nearclip;
	AnimationBlock transPos;
	Vec3D pos;
	AnimationBlock transTarget;
	Vec3D target;
	AnimationBlock rot;
};

struct ModelAttachmentDef {
	int32 id;
	int32 bone;
	Vec3D pos;
	AnimationBlock unk;
};

// block B - animations
struct ModelAnimation {
	uint32 animID;
	uint32 timeStart;
	uint32 timeEnd;

	float moveSpeed;

	uint32 loopType;
	uint32 flags;
	uint32 d1;
	uint32 d2;
	uint32 playSpeed;  // note: this can't be play speed because it's 0 for some models

	Vec3D boxA, boxB;
	float rad;

	int16 s[2];
};

struct ModelAnimationLookup
{
	uint16_t AnimIndex; // can be 0 for camera
};

struct ModelBoneDef {
	int32 animid;
	int32 flags;
	int16 parent; // parent bone index
	int16 geoid;
	// new int added to the bone definitions.  Added in WoW 2.0
	//int32 unknown;
	AnimationBlock translation;
	AnimationBlock rotation;
	AnimationBlock scaling;
	Vec3D pivot;
};

struct ModelKeyBoneLookup
{
	uint16_t Index; // can be -1 if none
};

struct ModelView {
	uint32 nIndex, ofsIndex; // Vertices in this model (index into vertices[])
	uint32 nTris, ofsTris;	 // indices
	uint32 nProps, ofsProps; // additional vtx properties
	uint32 nSub, ofsSub;	 // materials/renderops/submeshes
	uint32 nTex, ofsTex;	 // material properties/textures
	int32 lod;				 // LOD bias?
};

struct ModelHeader
{
	char id[4];
	uint32 version;
	uint32 nameLength;
	uint32 nameOfs;
	uint32 type;
	uint32 nGlobalSequences;
	uint32 ofsGlobalSequences;
	uint32 nAnimations;
	uint32 ofsAnimations;
	uint32 nAnimationLookup;
	uint32 ofsAnimationLookup;
	uint32 nD;
	uint32 ofsD;
	uint32 nBones;
	uint32 ofsBones;
	uint32 nKeyBoneLookup;
	uint32 ofsKeyBoneLookup;
	uint32 nVertices;
	uint32 ofsVertices;
	uint32 nViews;
	uint32 ofsViews;
	uint32 nColors;
	uint32 ofsColors;
	uint32 nTextures;
	uint32 ofsTextures;
	uint32 nTransparency;
	uint32 ofsTransparency;
	uint32 nI;
	uint32 ofsI;
	uint32 nTextureanimations;
	uint32 ofsTextureanimations;
	uint32 nTexReplace;
	uint32 ofsTexReplace;
	uint32 nRenderFlags;
	uint32 ofsRenderFlags;
	uint32 nBoneLookupTable;
	uint32 ofsBoneLookupTable;
	uint32 nTexLookup;
	uint32 ofsTexLookup;
	uint32 nTexUnits;
	uint32 ofsTexUnits;
	uint32 nTransLookup;
	uint32 ofsTransLookup;
	uint32 nTexAnimLookup;
	uint32 ofsTexAnimLookup;
	float floats[14];
	uint32 nBoundingTriangles;
	uint32 ofsBoundingTriangles;
	uint32 nBoundingVertices;
	uint32 ofsBoundingVertices;
	uint32 nBoundingNormals;
	uint32 ofsBoundingNormals;
	uint32 nAttachments;
	uint32 ofsAttachments;
	uint32 nAttachLookup;
	uint32 ofsAttachLookup;
	uint32 nAttachments_2;
	uint32 ofsAttachments_2;
	uint32 nLights;
	uint32 ofsLights;
	uint32 nCameras;
	uint32 ofsCameras;
	uint32 nCameraLookup;
	uint32 ofsCameraLookup;
	uint32 nRibbonEmitters;
	uint32 ofsRibbonEmitters;
	uint32 nParticleEmitters;
	uint32 ofsParticleEmitters;

};

struct ModelAnimRange
{
	uint32 First;
	uint32 Second;
};

Vec3D CamPos;

struct CameraPoint
{
	Fvector Position;
	Fvector Target;
	uint32 Time;
};

const uint32 Duration = 53 * 1000;

const Fvector CameraOrigin = { -5281.0f, -3686.0f, 330.0f };
//const Fvector CameraOrigin = { 1017.0f, 61.0f, 19.0f };

// const CameraPoint sCameraPoints[] =
// {
// 	{ {-5515.0f, -4098.0f, 435.0f}, {-5524.0f, -4119.0f, 423.0f}, 0},
// 	{ {-5566.0f, -4153.0f, 380.0f}, {-5569.0f, -4160.0f, 380.0f}, 7500},
// 	{ {-5564.0f, -4184.0f, 387.0f}, {-5559.0f, -4181.0f, 393.0f}, 15000},
// 	{ {-5547.0f, -4217.0f, 404.0f}, {-5547.0f, -4232.0f, 411.0f}, 22500},
// 	{ {-5561.0f, -4266.0f, 418.0f}, {-5566.0f, -4281.0f, 418.0f}, 30000},
// 	{ {-5590.0f, -4309.0f, 416.0f}, {-5596.0f, -4309.0f, 416.0f}, 37500},
// 	{ {-5630.0f, -4332.0f, 406.0f}, {-5630.0f, -4324.0f, 402.0f}, 53000},
// };
//  const CameraPoint sCameraPoints[] =
//  {
// 	 { {-4662.0f, -3242.0f, 289.0f}, { -4662.0f, -3286.0f, 313.0f}, 0},
// 	 { {-4723.0f, -3383.0f, 360.0f}, { -4743.0f, -3412.0f, 358.0f}, 4400},
// 	 { {-4876.0f, -3543.0f, 305.0f}, { -4903.0f, -3564.0f, 304.0f}, 8800},
// 	 { {-4984.0f, -3675.0f, 356.0f}, { -5007.0f, -3725.0f, 365.0f}, 13200},
// 	 { {-5082.0f, -3881.0f, 407.0f}, { -5127.0f, -3921.0f, 406.0f}, 17600},
// 	 { {-5231.0f, -3991.0f, 411.0f}, { -5252.0f, -4017.0f, 410.0f}, 22000},
// 	 { {-5344.0f, -4136.0f, 456.0f}, { -5378.0f, -4167.0f, 498.0f}, 26400},
// 	 { {-5414.0f, -4203.0f, 501.0f}, { -5424.0f, -4217.0f, 496.0f}, 30800},
// 	 { {-5480.0f, -4281.0f, 499.0f}, { -5503.0f, -4285.0f, 485.0f}, 35200},
// 	 { {-5540.0f, -4322.0f, 470.0f}, { -5558.0f, -4319.0f, 460.0f}, 39600},
// 	 { {-5622.0f, -4331.0f, 424.0f}, { -5623.0f, -4328.0f, 414.0f}, 44000},
// 	 { {-5630.0f, -4333.0f, 406.0f}, { -5630.0f, -4324.0f, 40.0f}, 53000},
//  };

// const CameraPoint sCameraPoints[] =
// {
// 	{ {-4696.0f, -3279.0f, 270}, { -4692.0f, -3284.0f, 270.0f}, 0},
// 	{ {-4707.0f, -3297.0f, 306}, { -4731.0f, -3322.0f, 318.0f}, 4000},
// 	{ {-4803.0f, -3388.0f, 316}, { -4806.0f, -3402.0f, 315.0f}, 8000},
// 	{ {-4922.0f, -3575.0f, 334}, { -4928.0f, -3583.0f, 334.0f}, 12000},
// 	{ {-4997.0f, -3780.0f, 364}, { -5000.0f, -3787.0f, 363.0f}, 16000},
// 	{ {-5050.0f, -3949.0f, 374}, { -5054.0f, -3954.0f, 374.0f}, 20000},
// 	{ {-5238.0f, -4121.0f, 361}, { -5266.0f, -4134.0f, 374.0f}, 24000},
// 	{ {-5378.0f, -4168.0f, 415}, { -5388.0f, -4174.0f, 424.0f}, 28000},
// 	{ {-5454.0f, -4298.0f, 493}, { -5463.0f, -4297.0f, 490.0f}, 32000},
// 	{ {-5556.0f, -4316.0f, 477}, { -5561.0f, -4313.0f, 475.0f}, 36000},
// 	{ {-5601.0f, -4323.0f, 458}, { -5626.0f, -4327.0f, 434.0f}, 40000},
// 	{ {-5628.0f, -4327.0f, 418}, { -5633.0f, -4332.0f, 415.0f}, 44000},
// 	{ {-5630.0f, -4333.0f, 406}, { -5630.0f, -4324.0f, 402.0f}, 53000},
// };

// const CameraPoint sCameraPoints[] =
// {
// 	{ {1017.0f, 61.0f,    19.0f}, { 1040.0f,   41.0f,  17.0f}, 0},
// 	{ {1043.0f, 39.0f,    17.0f}, { 1059.0f,   26.0f,  16.0f}, 5000},
// 	{ {1085.0f, 10.0f,    14.0f}, { 1104.0f,    9.0f,  12.0f}, 10000},
// 	{ {1154.0f, 2.0f,     10.0f}, { 1169.0f,   -4.0f,  10.0f}, 15000},
// 	{ {1210.0f, 21.0f,     8.0f}, { 1218.0f,   46.0f,   8.0f}, 20000},
// 	{ {1219.0f, 50.0f,     8.0f}, { 1204.0f,   88.0f,   8.0f}, 25000},
// 	{ {1216.0f, 143.0f,   20.0f}, { 1229.0f,  175.0f,  32.0f}, 30000},
// 	{ {1294.0f, 328.0f,  107.0f}, { 1303.0f,  350.0f, 119.0f}, 35000},
// 	{ {1402.0f, 566.0f,  254.0f}, { 1421.0f,  595.0f, 233.0f}, 40000},
// 	{ {1586.0f, 869.0f,  184.0f}, { 1596.0f,  924.0f, 189.0f}, 45000},
// 	{ {1637.0f, 1036.0f, 222.0f}, { 1662.0f, 1129.0f, 247.0f}, 50000},
// 	{ {1683.0f, 1246.0f, 290.0f}, { 1702.0f, 1270.0f, 277.0f}, 55000},
// 	{ {1725.0f, 1321.0f, 252.0f}, { 1741.0f, 1346.0f, 233.0f}, 60000},
// 	{ {1814.0f, 1391.0f, 154.0f}, { 1831.0f, 1385.0f, 148.0f}, 71000},
// };

 const CameraPoint sCameraPoints[] =
 {
	 { {-4662.0f, -3242.0f, 289.0f}, { -4662.0f, -3286.0f, 313.0f}, 0},		// P0
	 { {-4723.0f, -3383.0f, 360.0f}, { -4743.0f, -3412.0f, 358.0f}, 4400},	// P1
	 { {-4876.0f, -3543.0f, 305.0f}, { -4903.0f, -3564.0f, 304.0f}, 8800},  // P2
	 { {-4984.0f, -3675.0f, 356.0f}, { -5007.0f, -3725.0f, 365.0f}, 13200}, // P3
	 { {-5082.0f, -3881.0f, 407.0f}, { -5127.0f, -3921.0f, 406.0f}, 17600},
	 { {-5231.0f, -3991.0f, 411.0f}, { -5252.0f, -4017.0f, 410.0f}, 22000},
	 { {-5344.0f, -4136.0f, 456.0f}, { -5378.0f, -4167.0f, 498.0f}, 26400},
	 { {-5414.0f, -4203.0f, 501.0f}, { -5424.0f, -4217.0f, 496.0f}, 30800},
	 { {-5480.0f, -4281.0f, 499.0f}, { -5503.0f, -4285.0f, 485.0f}, 35200},
	 { {-5628.0f, -4327.0f, 418}, { -5633.0f, -4332.0f, 415.0f}, 44000},
	 { {-5630.0f, -4333.0f, 406}, { -5630.0f, -4324.0f, 402.0f}, 53000},
 };


enum TargetBlock
{
	TargetBlockPos,
	TargetBlockTarget
};

enum SmoothType
{
	SmoothIn,
	SmoothOut
};

// Credit to Denis Voloshin
void SmoothPoint(Fvector PrevPoint, Fvector BasePoint, Fvector NextPoint, SmoothType type, Fvector& OutPoint)
{
	// calc direction
	Fvector Dir = BasePoint;
	Dir.sub(PrevPoint);
	float PrevLen = Dir.magnitude();
	Dir.normalize();

	Fvector NextDir = NextPoint;
	NextDir.sub(BasePoint);
	float NextLen = NextDir.magnitude();
	NextDir.normalize();

	Fvector Result = Dir;
	Dir.add(NextDir);
	Result.normalize();

	switch (type)
	{
	case SmoothIn:
	{
		float HalfMagn = PrevLen / 2.0f;
		Result.mul(HalfMagn);
		OutPoint = BasePoint;
		OutPoint.sub(Result);
	}
		break;
	case SmoothOut:
	{
		float HalfMagn = NextLen / 2.0f;
		Result.mul(HalfMagn);
		OutPoint = BasePoint;
		OutPoint.add(Result);
	}
		break;
	default:
		break;
	}

	//OutPoint = Result;
}

void ModAnimationBlock(char* m2Content, AnimationBlock& InBlock, TargetBlock block)
{
	int AnimPoints = sizeof(sCameraPoints) / sizeof(sCameraPoints[0]);

	ModelAnimRange* Range = (ModelAnimRange*)(m2Content + InBlock.ofsRanges);
	Range->Second = AnimPoints - 1;

	InBlock.nTimes = AnimPoints;

	uint32* TimeData = (uint32*)(m2Content + InBlock.ofsTimes);
	for (int i = 0; i < AnimPoints; i++)
	{
		TimeData[i] = sCameraPoints[i].Time;
	}

	InBlock.nKeys = AnimPoints;

	Fvector* KeysArr = (Fvector*)(m2Content + InBlock.ofsKeys);

	auto GetPointLambda = [block, AnimPoints](int i) -> Fvector
	{
		if (i < 0)
		{
			return { 0.0f, 0.0f, 0.0f };
		}
		else if (i >= AnimPoints)
		{
			return { 0.0f, 0.0f, 0.0f };
		}

		Fvector OurPoint;
		switch (block)
		{
		case TargetBlockPos:
			OurPoint = sCameraPoints[i].Position;
			break;
		case TargetBlockTarget:
			OurPoint = sCameraPoints[i].Target;
			break;
		default:
			break;
		}

		Fvector CalcPoint = OurPoint;
		CalcPoint.sub(CameraOrigin);
		OurPoint = CalcPoint;

		return OurPoint;
	};

	for (int i = 0; i < AnimPoints; i++)
	{
		Fvector OurPoint = GetPointLambda(i);

		int BaseIndex = i * 3;
		KeysArr[BaseIndex + 0] = OurPoint; // Data
		KeysArr[BaseIndex + 1] = OurPoint; // In
		KeysArr[BaseIndex + 2] = OurPoint; // Out

#if 1
		if (i == 0)
		{
			KeysArr[BaseIndex + 1] = OurPoint; // In
		}
		else
		{
			Fvector SmoothedIn;
			SmoothPoint(GetPointLambda(i - 1), OurPoint, GetPointLambda(i + 1), SmoothIn, SmoothedIn);
			KeysArr[BaseIndex + 1] = SmoothedIn; // In
		}

		if (i == (AnimPoints - 1))
		{
			KeysArr[BaseIndex + 2] = OurPoint; // Out
		}
		else
		{
			Fvector SmoothedOut;
			SmoothPoint(GetPointLambda(i - 1), OurPoint, GetPointLambda(i + 1), SmoothOut, SmoothedOut);
			KeysArr[BaseIndex + 2] = SmoothedOut; // Out
		}
#endif
	}
}

void PrintAnimationBlock(char* m2Content, AnimationBlock& InBlock)
{
	switch (InBlock.type)
	{
	case InterpolationMethod::None:
		std::cout << "Interpolation: None" << std::endl;
		break;
	case InterpolationMethod::Linear:
		std::cout << "Interpolation: Linear" << std::endl;
		break;
	case InterpolationMethod::Hermite:
		std::cout << "Interpolation: Hermite" << std::endl;
		break;
	default:
		break;
	}

	if (InBlock.nRanges > 0)
	{
		std::vector<ModelAnimRange> AnimRanges;
		AnimRanges.resize(InBlock.nRanges);

		ModelAnimRange* pRangeStart = (ModelAnimRange*)(m2Content + InBlock.ofsRanges);
		memcpy(AnimRanges.data(), pRangeStart, sizeof(ModelAnimRange) * InBlock.nRanges);

		std::cout << "Printing ranges Num: " << InBlock.nRanges << std::endl;
		for (const ModelAnimRange& Item : AnimRanges)
		{
			std::cout << "\tFirst: " << Item.First << " Second: " << Item.Second << "" << std::endl;
		}
	}

	std::vector<uint32> Times;
	Times.resize(InBlock.nTimes);
	uint32* pTimesStart = (uint32*)(m2Content + InBlock.ofsTimes);
	memcpy(Times.data(), pTimesStart, InBlock.nTimes * sizeof(uint32));

	std::cout << "Printing Times Num: " << InBlock.nTimes << std::endl;

	for (uint32 time : Times)
	{
		std::cout << "\tTime: " << time << std::endl;
	}

	if (InBlock.type == InterpolationMethod::None || InBlock.type == InterpolationMethod::Linear)
	{
		std::vector<Vec3D> Data;
		Data.resize(InBlock.nKeys);
		Vec3D* pKeysStart = (Vec3D*)(m2Content + InBlock.ofsKeys);

		for (int i = 0; i < InBlock.nKeys; i++)
		{
			Data[i] = pKeysStart[i];
		}

		for (int i = 0; i < InBlock.nKeys; i++)
		{
			Vec3D& DataKey = Data[i];
			std::cout << "\tData X: " << DataKey.x << " Y: " << DataKey.y << " Z: " << DataKey.z << std::endl;
		}
	}
	else if (InBlock.type == InterpolationMethod::Hermite)
	{
		std::vector<Vec3D> Data;
		std::vector<Vec3D> In;
		std::vector<Vec3D> Out;

		Data.resize(InBlock.nKeys);
		In.resize(InBlock.nKeys);
		Out.resize(InBlock.nKeys);

		Vec3D* pKeysStart = (Vec3D*)(m2Content + InBlock.ofsKeys);

		for (int i = 0; i < InBlock.nKeys; i++)
		{
			Data[i] = pKeysStart[i * 3];
			In[i] = pKeysStart[i * 3 + 1];
			Out[i] = pKeysStart[i * 3 + 2];
		}

		// print data
		for (int i = 0; i < InBlock.nKeys; i++)
		{
			Vec3D& DataKey = Data[i];
			Vec3D& InKey = In[i];
			Vec3D& OutKey = Out[i];
			std::cout << "\tData X: " << DataKey.x << " Y: " << DataKey.y << " Z: " << DataKey.z << std::endl;
			std::cout << "\tIn X: " << InKey.x << " Y: " << InKey.y << " Z: " << InKey.z << std::endl;
			std::cout << "\tOut X: " << OutKey.x << " Y: " << OutKey.y << " Z: " << OutKey.z << std::endl;
			std::cout << std::endl;
		}
	}
}


int OpenVanillaMesh_Main(int argc, char** argv)
{
	//Fvector Test1{ 0.0f, 0.0f, 0.0f };
	//Fvector Test2{ 45.0f, 45.0f, 15.0f };
	//Fvector Smoothed;
	//SmoothPointIn(Test1, Test2, Smoothed);


	if (argc < 2)
	{
		return 1;
	}

	FILE* m2File = fopen(argv[1], "rb");
	if (m2File == NULL)
	{
		return 1;
	}

	fseek(m2File, 0, SEEK_END);
	long fileSize = ftell(m2File);
	fseek(m2File, 0, SEEK_SET);

	char* m2Content = new char[fileSize];
	size_t ElemsReaded = fread(m2Content, fileSize, 1, m2File);
	assert(ElemsReaded == 1);
	fclose(m2File); m2File = NULL;

	ModelHeader* m2Header = (ModelHeader*)m2Content;

	std::cout << "M2 Version: " << m2Header->version << std::endl;
	std::cout << "M2 Type: " << m2Header->type << std::endl;

	char* NameData = m2Content + m2Header->nameOfs;
	ModelAnimation* AnimData = (ModelAnimation*) (m2Content + m2Header->ofsAnimations);
	char* AnimLookupsData = m2Content + m2Header->ofsAnimationLookup;
	ModelCameraDef* CameraData = (ModelCameraDef*) (m2Content + m2Header->ofsCameras);
	char* CameraLookupData = m2Content + m2Header->ofsCameraLookup;

	uint16_t* CameraIndx = (uint16_t*)(m2Content + m2Header->ofsCameraLookup);

	CamPos = CameraData->pos;

	ModelBoneDef* BoneData = (ModelBoneDef*)(m2Content + m2Header->ofsBones);

	ModelView* ViewArr = (ModelView*)(m2Content + m2Header->ofsViews);

	ModelView& FirstView = ViewArr[0];
	ModelView& SecondView = ViewArr[1];
	ModelView& ThirdView = ViewArr[2];
	ModelView& FourthView = ViewArr[3];
	
	//std::cout << "M2 Camera transPos: " << std::endl;
	//PrintAnimationBlock(m2Content, CameraData->transPos);
	//std::cout << "M2 Camera transTarget: " << std::endl;
	//PrintAnimationBlock(m2Content, CameraData->transTarget);
	//std::cout << "M2 Camera rot: " << std::endl;
	//PrintAnimationBlock(m2Content, CameraData->rot);
	CameraData->pos.x = 0.0f;
	CameraData->pos.y = 0.0f;
	CameraData->pos.z = 0.0f;
	CameraData->target.x = 0.0f;
	CameraData->target.y = 0.0f;
	CameraData->target.z = 0.0f;

	//std::cout << "M2 Camera Bone translation: " << std::endl;
	//PrintAnimationBlock(m2Content, BoneData->translation);
	//std::cout << "M2 Camera Bone rotation: " << std::endl;
	//PrintAnimationBlock(m2Content, BoneData->rotation);
	//std::cout << "M2 Camera Bone scaling: " << std::endl;
	//PrintAnimationBlock(m2Content, BoneData->scaling);

	// modify anim
	ModAnimationBlock(m2Content, CameraData->transPos, TargetBlockPos);
	ModAnimationBlock(m2Content, CameraData->transTarget, TargetBlockTarget);
	AnimData->timeEnd = Duration;

	//FILE* OutFile = fopen("FlyByGoblin.m2", "wb+");
	FILE* OutFile = fopen("FlyByElf.m2", "wb+");
	size_t Elems = fwrite(m2Content, fileSize, 1, OutFile);
	assert(Elems == 1);
	fclose(OutFile);

	delete[] m2Content;
	return 0;
}



int CreateVanillaCameraMesh_Main(int argc, char** argv)
{
	//#TODO: Open input data file

	// for now, generate M2 file in memory

	std::vector<char> M2File;

	auto PutDataInFileAndTellOffset = [&M2File](const void* data, int Len) -> int
	{
		int CurrentSize = M2File.size();
		M2File.resize(CurrentSize + Len);
		memcpy(&M2File[CurrentSize], data, Len);
		return CurrentSize;
	};

	// reserve memory for header
	M2File.resize(sizeof(ModelHeader));

	ModelHeader CameraHeader;
	ZeroMemory(&CameraHeader, sizeof(ModelHeader));
	CameraHeader.id[0] = 'M';
	CameraHeader.id[1] = 'D';
	CameraHeader.id[2] = '2';
	CameraHeader.id[3] = '0';
	CameraHeader.version = 256;

	const char* Name = "TestFly";
	int NameLen = strlen(Name);
	CameraHeader.nameLength = NameLen;
	CameraHeader.nameOfs = PutDataInFileAndTellOffset(Name, NameLen + 1);

	ModelAnimation Anim;
	ZeroMemory(&Anim, sizeof(ModelAnimation));
	Anim.loopType = 1;
	Anim.flags = 32767;
	Anim.s[0] = -1;

	Anim.timeEnd = Duration;

	CameraHeader.nAnimations = 1;
	CameraHeader.ofsAnimations = PutDataInFileAndTellOffset(&Anim, sizeof(ModelAnimation));

	ModelAnimationLookup Lookup;
	Lookup.AnimIndex = 0;
	CameraHeader.nAnimationLookup = 1;
	CameraHeader.ofsAnimationLookup = PutDataInFileAndTellOffset(&Lookup, sizeof(ModelAnimationLookup));

	//#INFO: D component is missed. D component is probably uint8 or uint16 array with some numbers. It's hard to tell, should I generate them
	std::vector<uint32> DComponent;
	DComponent.resize(203);
	ZeroMemory(DComponent.data(), DComponent.size() * sizeof(uint32));
	CameraHeader.nD = 203;
	CameraHeader.ofsD = PutDataInFileAndTellOffset(DComponent.data(), DComponent.size() * sizeof(uint32));

	uint32 DefaultTime = 0;
	Vec3D NullVector = { 0.0f, 0.0f, 0.0f };
	Vec3D IdentityVector = { 1.0f, 1.0f, 1.0f };

	ModelBoneDef Bone;
	ZeroMemory(&Bone, sizeof(ModelBoneDef));
	Bone.animid = -1;
	Bone.parent = -1;

	Bone.translation.seq = -1;
	Bone.translation.nTimes = 1;
	Bone.translation.ofsTimes = PutDataInFileAndTellOffset(&DefaultTime, sizeof(uint32));
	Bone.translation.nKeys = 1;
	Bone.translation.ofsKeys = PutDataInFileAndTellOffset(&NullVector, sizeof(NullVector));

	Bone.rotation.seq = -1;
	Bone.rotation.nTimes = 1;
	Bone.rotation.ofsTimes = PutDataInFileAndTellOffset(&DefaultTime, sizeof(uint32));
	Bone.rotation.nKeys = 1;
	Bone.rotation.ofsKeys = PutDataInFileAndTellOffset(&NullVector, sizeof(NullVector));

	Bone.scaling.seq = -1;
	Bone.scaling.nTimes = 1;
	Bone.scaling.ofsTimes = PutDataInFileAndTellOffset(&DefaultTime, sizeof(uint32));
	Bone.scaling.nKeys = 1;
	Bone.scaling.ofsKeys = PutDataInFileAndTellOffset(&IdentityVector, sizeof(IdentityVector));

	CameraHeader.nBones = 1;
	CameraHeader.ofsBones = PutDataInFileAndTellOffset(&Bone, sizeof(Bone));

	ModelKeyBoneLookup KeyBoneLookup;
	KeyBoneLookup.Index = -1;
	CameraHeader.nKeyBoneLookup = 1;
	CameraHeader.ofsKeyBoneLookup = PutDataInFileAndTellOffset(&KeyBoneLookup, sizeof(ModelKeyBoneLookup));

	ModelView View[4];
	ZeroMemory(&View, sizeof(View));
	View[0].lod = 256;
	View[1].lod = 75;
	View[2].lod = 53;
	View[3].lod = 21;

	CameraHeader.nViews = 4;
	CameraHeader.ofsViews = PutDataInFileAndTellOffset(&View[0], sizeof(ModelView) * 4);

	ModelCameraDef Camera;
	ZeroMemory(&Camera, sizeof(Camera));
	Camera.id = -1;
	Camera.fov = 0.7853f;
	Camera.farclip = 27.77f;
	Camera.nearclip = 0.22f;

	int AnimPoints = sizeof(sCameraPoints) / sizeof(sCameraPoints[0]);
	
	Camera.transPos.type = InterpolationMethod::Hermite;
	Camera.transPos.seq = -1;
	Camera.transPos.nRanges = 1;
	ModelAnimRange DefaultRange = { 0u, AnimPoints - 1 };
	Camera.transPos.ofsRanges = PutDataInFileAndTellOffset(&DefaultRange, sizeof(DefaultRange));
	Camera.transPos.nTimes = AnimPoints;

	std::vector<uint32> TimesArr;
	TimesArr.resize(AnimPoints);
	for (int i = 0; i < AnimPoints; i++)
	{
		TimesArr[i] = sCameraPoints[i].Time;
	}

	Camera.transPos.ofsTimes = PutDataInFileAndTellOffset(TimesArr.data(), TimesArr.size() * sizeof(uint32));
	Camera.transPos.nKeys = AnimPoints;

	std::vector<Fvector> KeysArr;
	KeysArr.resize(AnimPoints * 3);
	for (int i = 0; i < AnimPoints; i++)
	{
		int baseIndex = i * 3;
		KeysArr[baseIndex] = sCameraPoints[i].Position;
		KeysArr[baseIndex + 1] = sCameraPoints[i].Position;
		KeysArr[baseIndex + 2] = sCameraPoints[i].Position;
	}

	Camera.transPos.ofsKeys = PutDataInFileAndTellOffset(KeysArr.data(), KeysArr.size() * sizeof(Vec3D));

	Camera.transTarget.type = InterpolationMethod::Hermite;
	Camera.transTarget.seq = -1;
	Camera.transTarget.nRanges = 1;
	Camera.transTarget.ofsRanges = PutDataInFileAndTellOffset(&DefaultRange, sizeof(DefaultRange));
	Camera.transTarget.nTimes = AnimPoints;
	Camera.transTarget.ofsTimes = PutDataInFileAndTellOffset(TimesArr.data(), TimesArr.size() * sizeof(uint32));
	Camera.transTarget.nKeys = AnimPoints;

	std::vector<Fvector> KeysArr2;
	KeysArr2.resize(AnimPoints * 3);
	for (int i = 0; i < AnimPoints; i++)
	{
		int baseIndex = i * 3;
		KeysArr2[baseIndex] = sCameraPoints[i].Target;
		KeysArr2[baseIndex + 1] = sCameraPoints[i].Target;
		KeysArr2[baseIndex + 2] = sCameraPoints[i].Target;
	}

	Camera.transTarget.ofsKeys = PutDataInFileAndTellOffset(KeysArr2.data(), KeysArr2.size() * sizeof(Vec3D));

	Camera.rot.type = InterpolationMethod::None;
	Camera.rot.seq = -1;
	Camera.rot.nTimes = 1;
	int Zero = 0;
	Camera.rot.ofsTimes = PutDataInFileAndTellOffset(&Zero, sizeof(uint32));

	CameraHeader.nCameras = 1;
	CameraHeader.ofsCameras = PutDataInFileAndTellOffset(&Camera, sizeof(Camera));

	CameraHeader.nCameraLookup = 1;
	uint16_t DefaultCameraLookup = 0xffff;
	CameraHeader.ofsCameraLookup = PutDataInFileAndTellOffset(&DefaultCameraLookup, sizeof(DefaultCameraLookup));

	memcpy(M2File.data(), &CameraHeader, sizeof(CameraHeader));

	FILE* OutFile = fopen("TestFly.m2", "wb+");
	size_t Elems = fwrite(M2File.data(), M2File.size(), 1, OutFile);
	assert(Elems == 1);
	fclose(OutFile);

	return 0;
}