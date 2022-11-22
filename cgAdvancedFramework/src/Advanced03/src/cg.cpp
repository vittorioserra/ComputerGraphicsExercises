#include "cg.h"
#include <bits/types/time_t.h>
#include <cmath>

using std::cout;
using std::endl;


static void createBuffers(Mesh& mesh, std::vector<VertexNT>& vertices, std::vector<int>& indices, GLenum drawMode = GL_TRIANGLES)
{

    glGenVertexArrays(1, &mesh.vao);
    glBindVertexArray(mesh.vao);

    glGenBuffers(1, &mesh.vbo);
    glBindBuffer(GL_ARRAY_BUFFER, mesh.vbo);
    glBufferData(GL_ARRAY_BUFFER, vertices.size() * sizeof(VertexNT), vertices.data(), GL_STATIC_DRAW);

    glEnableVertexAttribArray( 0 );
    glEnableVertexAttribArray( 1 );
    glEnableVertexAttribArray( 2 );

    glVertexAttribPointer(0,4, GL_FLOAT, GL_FALSE, sizeof(VertexNT), 0 );
    glVertexAttribPointer(1,4, GL_FLOAT, GL_FALSE, sizeof(VertexNT), (void*) (4 * sizeof(GLfloat)) );
    glVertexAttribPointer(2,2, GL_FLOAT, GL_FALSE, sizeof(VertexNT), (void*) (8 * sizeof(GLfloat)) );


    glGenBuffers(1, &mesh.ibo);
    glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, mesh.ibo);
    glBufferData(GL_ELEMENT_ARRAY_BUFFER, indices.size() * sizeof(int), indices.data(), GL_STATIC_DRAW);

	mesh.numElements = (int)indices.size();
    mesh.drawMode = drawMode;
}

CG::CG(int w, int h) : Window(w,h)
{


    shaderManager.registerProgram("simple_color", SHADERTYPE_FLAG::VERTEX | SHADERTYPE_FLAG::FRAGMENT);
    shaderManager.update();

    {
        //load our planet mesh from file
        ObjLoader2 objLoader;
        objLoader.loadFile("data/icosphere.obj");
        std::vector<int> indices;
        for(auto f : objLoader.outTriangles)
        {
            indices.emplace_back(f.v[0]);indices.emplace_back(f.v[1]);indices.emplace_back(f.v[2]);
        }
        createBuffers(sphereMesh,objLoader.outVertices,indices,GL_TRIANGLES);
    }

    {
        //create ring mesh
        int segments = 100;
        float radius = 1;
        std::vector<int> indices;
        std::vector<VertexNT> vertices;
        for(int i = 0; i < segments; ++i)
        {
            float angle = float(i) / segments * glm::two_pi<float>();
            VertexNT v;
            v.position = vec4(radius*sin(angle),-cos(angle),0,1);
            vertices.push_back(v);
            indices.push_back(i);
        }
        indices.push_back(0);
        createBuffers(ringMesh,vertices,indices,GL_LINE_STRIP);
    }


    camera.lookAt( vec3(0,0,10), vec3(0), vec3(0,1,0));

}

void CG::update(float dt)
{
    time += dt * timeScale;

    if(!ImGui::GetIO().WantCaptureMouse)
        camera.update(dt);

    // TODO 3.5		Use the following methods to create 4x4 transformation matrices:
    //				mat4 glm::translate(vec3 v);
    //				mat4 glm::scale(vec3 v);
    //				mat4 glm::rotate(float angle, vec3 axis);

    // a) Sun
    sun = mat4(1); // <- Change this line

    glm::mat4 sun_rot_matrix((float) cos(time*2*M_PI/sunRotationTime), (float) -sin(time*2*M_PI/sunRotationTime), 0.0f, 0.0f,(float) sin(time*2*M_PI/sunRotationTime),(float) cos(time*2*M_PI/sunRotationTime), 0.0f, 0.0f, 0.0f, 0.0f, 1.0f, 0.0f,0.0f, 0.0f, 0.0f, 1.0f);

    glm::mat4 sun_scale_matrix(sunRadius, 0, 0, 0,
                               0, sunRadius, 0, 0,
                               0, 0, sunRadius, 0,
                               0, 0, 0, 1);

    glm::mat4 sun_obl_matrix(cos(sunObliquity), 0, sin(sunObliquity), 0,
                             0, 1, 0, 0,
                             -sin(sunObliquity), 0, cos(sunObliquity), 0,
                             0, 0, 0, 1);

    sun = sun * sun_scale_matrix * sun_obl_matrix *sun_rot_matrix;


    // b) Earth
    earth = mat4(1);
    glm::mat4 earth_scale_matrix(earthRadius, 0, 0, 0,
                                 0, earthRadius, 0, 0,
                                 0, 0, earthRadius, 0,
                                 0, 0, 0, 1);
    glm::mat4 earth_obl_matrix(cos(earthObliquity), 0, sin(earthObliquity), 0,
                               0, 1, 0, 0,
                               -sin(earthObliquity), 0, cos(earthObliquity), 0,
                               0, 0, 0, 1);
    glm::mat4 earth_rot_matrix((float) cos(time*2*M_PI/earthRotationTime), (float) -sin(time*2*M_PI/earthRotationTime), 0.0f, 0.0f,
                               (float) sin(time*2*M_PI/earthRotationTime), (float)  cos(time*2*M_PI/earthRotationTime), 0.0f, 0.0f,
                               0.0f, 0.0f, 1.0f, 0.0f,
                               0.0f, 0.0f, 0.0f, 1.0f);


    glm::mat4 earth_revolution_translation = glm::translate(
        vec3(earthOrbitRadius*cos(-time*2*M_PI/earthRevolutionTime),
             earthOrbitRadius*sin(-time*2*M_PI/earthRevolutionTime),0)
                                                            );

    earth = earth  * earth_revolution_translation * earth_scale_matrix * earth_obl_matrix * earth_rot_matrix;

    // c) Moon
    moon =  mat4(1);

    glm::mat4 moon_scale_matrix(moonRadius, 0, 0, 0,
                                 0, moonRadius, 0, 0,
                                 0, 0, moonRadius, 0,
                                 0, 0, 0, 1);
    glm::mat4 moon_obl_matrix(cos(moonObliquity), 0, sin(moonObliquity), 0,
                               0, 1, 0, 0,
                               -sin(moonObliquity), 0, cos(moonObliquity), 0,
                               0, 0, 0, 1);
    glm::mat4 moon_rot_matrix((float) cos(time*2*M_PI/moonRotationTime), (float) -sin(time*2*M_PI/moonRotationTime), 0.0f, 0.0f,
                               (float) sin(time*2*M_PI/moonRotationTime), (float)  cos(time*2*M_PI/moonRotationTime), 0.0f, 0.0f,
                               0.0f, 0.0f, 1.0f, 0.0f,
                               0.0f, 0.0f, 0.0f, 1.0f);


    glm::mat4 moon_revolution_translation = glm::translate(vec3(moonOrbitRadius*cos(-time*2*M_PI/moonRevolutionTime),moonOrbitRadius*sin(-time*2*M_PI/moonRevolutionTime),0));

    glm::mat4 moon_offset(cos(moonOrbitalInclination), 0, sin(moonOrbitalInclination), 0,
                          0, 1, 0, 0,
                          -sin(moonOrbitalInclination), 0, cos(moonOrbitalInclination), 0,
                          0, 0, 0, 1);


    moon = moon * earth_revolution_translation* moon_offset  *moon_revolution_translation *  moon_scale_matrix * inverse(moon_offset)*moon_obl_matrix* moon_rot_matrix;



    // d) Orbit Rings
    earthOrbit = glm::scale(vec3(earthOrbitRadius));

    moonOrbit = earth_revolution_translation * moon_offset * glm::scale(vec3(moonOrbitRadius));

}

void CG::render()
{
    glClearColor(0,0,0,0);
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    glEnable(GL_DEPTH_TEST);

    //wireframe mode
    glPolygonMode( GL_FRONT_AND_BACK, GL_LINE );

    glUseProgram(shaderManager.getProgramGL("simple_color"));

    glm::mat4 m = camera.getProjectionMatrix() * camera.getViewMatrix();
    glUniformMatrix4fv(0, 1, GL_FALSE, &m[0][0]);

    //sun
    glUniform4fv(2,1,&vec4(1,1,0,1)[0]);
    glUniformMatrix4fv(1, 1, GL_FALSE, &sun[0][0]);
    sphereMesh.render();

    //earth
    glUniform4fv(2,1,&vec4(0,0,1,1)[0]);
    glUniformMatrix4fv(1, 1, GL_FALSE, &earth[0][0]);
    sphereMesh.render();
    glUniformMatrix4fv(1, 1, GL_FALSE, &earthOrbit[0][0]);
    ringMesh.render();

    //moon
    glUniform4fv(2,1,&vec4(0.6,0.6,0.6,1)[0]);
    glUniformMatrix4fv(1, 1, GL_FALSE, &moon[0][0]);
    sphereMesh.render();
    glUniformMatrix4fv(1, 1, GL_FALSE, &moonOrbit[0][0]);
    ringMesh.render();

    glPolygonMode( GL_FRONT_AND_BACK, GL_FILL );
}

void CG::renderGui()
{
    ImGui::SetNextWindowPos(ImVec2(0, 0), ImGuiSetCond_Once);
    ImGui::SetNextWindowSize(ImVec2(500,400), ImGuiSetCond_Once);
    ImGui::Begin("Solar System");

    ImGui::SliderFloat("Time Scale",&timeScale,0,10);

    ImGui::SliderFloat("sunRotationTime",&sunRotationTime,1,100);
    ImGui::SliderAngle("sunObliquity",&sunObliquity,-90,90);
    ImGui::SliderFloat("sunRadius",&sunRadius,0,10);

    ImGui::SliderFloat("earthRotationTime",&earthRotationTime,0,5);
    ImGui::SliderFloat("earthRevolutionTime",&earthRevolutionTime,0,500);
    ImGui::SliderAngle("earthObliquity",&earthObliquity,-90,90);
    ImGui::SliderFloat("earthRadius",&earthRadius,0,5);
    ImGui::SliderFloat("earthOrbitRadius",&earthOrbitRadius,0,20);

    ImGui::SliderFloat("moonRevolutionTime",&moonRevolutionTime,0,50);
    ImGui::SliderFloat("moonRotationTime",&moonRotationTime,0,50);
    ImGui::SliderAngle("moonOrbitalInclination",&moonOrbitalInclination,-90,90);
    ImGui::SliderAngle("moonObliquity",&moonObliquity,-90,90);
    ImGui::SliderFloat("moonRadius",&moonRadius,0,2);
    ImGui::SliderFloat("moonOrbitRadius",&moonOrbitRadius,0,6);


    ImGui::End();
}
