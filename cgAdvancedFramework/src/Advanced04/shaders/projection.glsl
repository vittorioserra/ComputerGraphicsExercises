
vec3 projectVertexToPlane(vec3 vertex, vec3 direction, vec3 pointOnPlane, vec3 planeNormal)
{
    vec3 projectedPoint;
    // TODO 4.4 a)
    // Project 'vertex' on the plane defined by 'pointOnPlane' and 'planeNormal'.
    // The projection direction is given by 'direction'.

    //vertex and direction should be unit vectors for now
    //vertex = normalize(vertex);
    //direction = normalize(direction);
    //planeNormal = normalize(planeNormal);

    projectedPoint = vertex + ((dot((pointOnPlane-vertex), planeNormal))/dot(direction,planeNormal))* direction;

    return projectedPoint;
}
