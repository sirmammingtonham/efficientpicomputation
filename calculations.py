m1 = 1

digits = int(input("How many digits of pi would you like to compute?"))

m2 = 10**digits
# Mass of object at rest: m1
# Mass of moving object: m2

initVector = [0,1]
# [Velocity of m1, Velocity of m2]

currentVector = initVector

def mulA(vec):
    msum = (m1 + m2)
    a11 = (m1 - m2)/float(msum)
    a12 = 2*m2/float(msum)
    a21 = 2*m1/float(msum)
    a22 = (m2 - m1)/float(msum)


    v1 = a11*vec[0] + a12*vec[1]
    v2 = a21*vec[0] + a22*vec[1]

    return [v1, v2]

# When the lighter mass hits the wall, 
# reverse its velocity but maintain velocity of larger mass

def mulW(vec):
    v1 = (-1)*vec[0]
    v2 = vec[1]
    return [v1, v2]

# Checks if the speed of the inner/smaller mass is 
# faster than the outer/larger one
def checkspeeds(v1, v2):
    if (v1 <= 0 and v2 <=0):
        if(abs(v1) >= abs(v2)):
            return False

    return True

collisioncount = 0

mtype = 'A'

while(checkspeeds(currentVector[0], currentVector[1])):
    if (mtype == 'A'):
        newVec = mulA(currentVector)
        currentVector = newVec
        collisioncount += 1 #increment counter on collision
        mtype = 'W'
    elif (mtype == 'W'):
        newVec = mulW(currentVector)
        currentVector = newVec
        collisioncount += 1 #increment counter on collision
        mtype = 'A'

print(f"Mass at moving initally: " )
print(f"Total number of collisions of the masses: {collisioncount}")