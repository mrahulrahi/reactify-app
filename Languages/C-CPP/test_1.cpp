#include <iostream>
#include <conio.h>
using namespace std;
class demo
{
    int x, y;

public:
    demo()
    {
        x = y = 0;
    }
    demo(int c, int d)
    {
        x = c;
        y = d;
    }

    void getdata()
    {
        cout << "Enter Two values :" << endl;
        cin >> x >> y;
    }
    void putdata()
    {
        cout << "X :" << x << " Y :" << y << endl;
    }
};

inline int
sum(int a, int b)
{
    return a + b;
}
int b = 40;
int main()
{
    int a;
    cout << "Enter Your Number :" << endl;
    cin >> a;
    cout << "Your Number is :" << a << endl;
    cout << "B :" << ::b << endl;
    cout << "Sum :" << sum(a, b) << endl;
    demo ob1, ob2, ob3, ob4(10, 20), ob5;
    ob1.getdata();
    ob1.putdata();

    ob2.getdata();
    ob2.putdata();

    cout << "Object 3 values :" << endl;
    ob3.putdata();

    cout << "Object 4 values :" << endl;
    ob4.putdata();

    cout << "Object 5 values :" << endl;
    ob5.putdata();
    ob5.getdata();
    cout << "Object 5 new values :" << endl;
    ob5.putdata();

    getch();
}