
--vertex
layout(location = 0) in vec3 in_position;
layout(location = 1) in vec3 in_normal;

layout (location = 0) uniform mat4 projView;
layout (location = 1) uniform mat4 model;

out vec3 normal;
 
void main() {
        gl_Position = projView * model * vec4(in_position, 1);
        normal = vec3(model * vec4(in_normal,0));
}

--fragment

layout (location = 2) uniform vec4 color;
layout (location = 3) uniform vec3 lightDir;

layout (location = 0) out vec4 out_color;

in vec3 normal;

void main() {
    out_color = color * max(0,dot(normalize(normal),normalize(-lightDir)));
}
