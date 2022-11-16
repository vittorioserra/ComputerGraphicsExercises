#pragma once

#include "framework/cg_helper.h"

using namespace glm;


class CG : public Window
{
public:
    CG(int w, int h);
    virtual void update(float dt);
    virtual void render();
    virtual void renderGui();
private:
    Camera camera;
    Mesh sphereMesh, ringMesh;
    float time = 0;
    float timeScale = 1;
    mat4 earth, moon, sun;
    mat4 earthOrbit, moonOrbit;


    //Solar System Paramters

    float sunRotationTime = 30;
    float sunObliquity = glm::radians(7.25f);
    float sunRadius = 1.5f;

    float earthRotationTime = 0.9972685185185185f;
    float earthRevolutionTime = 365.256f;
    float earthObliquity = glm::radians(23.4f);
    float earthRadius = 0.5f;
    float earthOrbitRadius = 5;

    float moonRevolutionTime = 27.323f;
    float moonRotationTime = moonRevolutionTime;
    float moonOrbitalInclination = glm::radians(5.14f);
    float moonObliquity = glm::radians(1.54f); //relative to ecliptic plane
    float moonRadius = 0.2f;
    float moonOrbitRadius = 1;
};
