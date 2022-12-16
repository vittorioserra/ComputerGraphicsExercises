﻿#include "fps_camera.h"


FPSCamera::FPSCamera() {
    currentTransformation.orientation = Quaternion();
    projectionMatrix = glm::perspective(glm::radians(70.0f),16.0f / 9.0f, 0.1f,100.0f);
    currentTransformation.position = glm::vec3(0.0f, 2.0f, 8.0f);
    startY = currentTransformation.position.y;
}

void FPSCamera::translate(float dx, float dz, float dt)
{

    // TODO 7.4 a)
    // Compute the correct velocity vector and integrate the position with it.
    // The parameters dx and dz give the motion along the local x and z axis.
    // Make sure that the final velocity is parallel to the x-z plane.
	// Take cameraSpeed into account.

    //Change these two lines...

    vec3 xDir = currentTransformation.orientation * vec3(1, 0, 0);
    vec3 yDir = currentTransformation.orientation * vec3(0, 0, 1);

    xDir = dx * xDir;
    yDir = dz * yDir;

    vec3 translation = xDir + yDir;

    translation.y = 0;
    translation = normalize(translation);

    vec3 velocity = translation * cameraSpeed;//vec3(dx,0,dz) * cameraSpeed;


    currentTransformation.position += velocity * dt;
}

void FPSCamera::turn(vec2 relMouseMovement)
{
	float dx = sensitivity * relMouseMovement.x;
	float dy = sensitivity * relMouseMovement.y;

    // TODO 7.4 b)
    // Implement the camera turning with the mouse.
    // - Create the quaternions representing the x and y axis rotation.
    // - The local x axis of the camera must always be parallel to the ground!
    // - Forbid upside-down turning: (newOrientation * vec3(0,1,0)).y should be > 0.
	//	 Otherwise, only use the rotation around the y axis.

    Quaternion x_rot_axis = Quaternion(vec3(0.0,1.0,0.0), dx);
    Quaternion y_rot_axis = Quaternion(vec3(1.0,0.0,0.0), dy); // this is global

    // compute newOrientation from currentTransformation.orientation

    Quaternion newOrientation = x_rot_axis * currentTransformation.orientation * y_rot_axis;

    if((newOrientation * vec3(0,1,0)).y <= 0.0){

        newOrientation = x_rot_axis * currentTransformation.orientation;

    }

    newOrientation = newOrientation.normalize();

    // When you are done, set current transformation and last transformation so that we do not interpolate mouse motion
    // (Don't change these two lines!).
    currentTransformation.orientation = newOrientation;
    lastTransformation.orientation = currentTransformation.orientation;
}

bool executeJump = false;

void FPSCamera::updatePosition(float dt)
{
    Object::update();

    const Uint8 *keyBoardState = SDL_GetKeyboardState(NULL);

    // TODO 7.4 a)
    // Read the keyboard state and call the translate function with the correct parameters.
    // Keys - Action
    // W - Forward
    // S - Backward
    // A - Left
    // D - Right
    bool dPressed = keyBoardState[SDL_SCANCODE_D]; // example of how to get the keystate
    bool aPressed = keyBoardState[SDL_SCANCODE_A];
    bool sPressed = keyBoardState[SDL_SCANCODE_S];
    bool wPressed = keyBoardState[SDL_SCANCODE_W];


    if(wPressed){

        translate(0.0,-1.0, dt);

    }

    if(sPressed){

        translate(0.0, +1.0, dt);

    }

    if(aPressed){

        translate(-1.0, 0.0, dt);

    }

    if(dPressed){

        translate(+1.0, 0.0, dt);

    }


    // TODO 7.4 c)
    // Implement a simple jumping behaviour when pressing "space" (= SDL_SCANCODE_SPACE).
    // - Use the member variables "vy" and "startY".
    // - vy is the vertical current velocity.
    // - startY is the height of the camera when it is on the ground.
	// - Change y according to vy.
	// - Change vy according to the earth acceleration.
    // - y should not drop below startY.

    bool spacePressed = keyBoardState[SDL_SCANCODE_SPACE];

    float v_start = 10.0;
    float acceleration = -9.81; //m/s^2

    if(spacePressed&(!executeJump)){

        executeJump = true;
        startY =  currentTransformation.position.y;

        std::cout<<"space pressed"<< std::endl;

        vy = v_start;
    }

    if((currentTransformation.position.y >= startY)&executeJump){ //vy != 0

        vy += acceleration*dt;
        currentTransformation.position.y += vy * dt;

        if(currentTransformation.position.y <= startY){

            executeJump = false;

            std::cout<<"set to false"<<std::endl;

        }


    }




    float& y = currentTransformation.position.y;

}

void FPSCamera::updateOrientation(bool capture)
{
    int mouseX, mouseY;
    Uint32 buttons = SDL_GetMouseState(&mouseX, &mouseY);

    glm::vec2 newMousePos = glm::vec2(mouseX,mouseY);
    glm::vec2 relMovement = prevMousePosition - newMousePos;

    if (capture || SDL_BUTTON(SDL_BUTTON_LEFT) & buttons)
    {
        turn(relMovement);
    }
    prevMousePosition = newMousePos;
}

