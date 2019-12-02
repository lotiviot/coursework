
//  cc -shared -fPIC -o libfuncs.so funcs.c

int barf(int arg)
{
    return arg + 1000;
}

int whoops(int arg)
{
    return 100;
}
