using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class MovePlane : MonoBehaviour
{

    private Rigidbody r_body;

    // Start is called before the first frame update
    void Start()
    {
        r_body = gameObject.GetComponent(typeof(Rigidbody)) as Rigidbody;
    }

    // Update is called once per frame
    void FixedUpdate()
    {
        float verticalMovement = Input.GetAxis("Vertical");
        float horizontalMovement = Input.GetAxis("Horizontal");

        //Debug.Log("Vertical : " + verticalMovement + " Horizontal : " +horizontalMovement );

        float angleMax = 45.0f; //degrees
        float smooth = 5.0f;
        float angleRotVertical = verticalMovement * angleMax;
        float angleRotHorizontal = -1.0f * horizontalMovement * angleMax;

        Quaternion rotationQuaternion = Quaternion.Euler(angleRotVertical, 0, angleRotHorizontal);

        transform.rotation =  Quaternion.Slerp(transform.rotation, rotationQuaternion,  Time.deltaTime * smooth);

        var rotation_delta = rotationQuaternion * Quaternion.Inverse(transform.rotation);
        float angleInDegrees;
        Vector3 rotationAxis;
        rotation_delta.ToAngleAxis(out angleInDegrees, out rotationAxis);
        Vector3 angularDisplacement = rotationAxis * angleInDegrees * Mathf.Deg2Rad;
        Vector3 targetAngularVelocity = angularDisplacement / Time.fixedDeltaTime * 0.25f;

        r_body.angularVelocity = targetAngularVelocity;

    }
}
