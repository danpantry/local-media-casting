import functools


def memoize(fn):
    called = False
    ret = None

    @functools.wraps(fn)
    def memoized(*args, **kwargs):
        nonlocal called, ret

        if called == True:
            return ret

        ret = fn(*args, **kwargs)
        called = True
        return ret

    return memoized


def first(iter, func=lambda _: True):
    for x in iter:
        if func(x):
            return x

    raise Exception('There were no elements that matched the given predicate')


def first_default(iter, func=lambda _: True, default=None):
    for x in iter:
        if func(x):
            return x

    return default
