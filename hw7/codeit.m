function out = codeit(in)
lut = char(1:255);
lut(['a':'z', 'A':'Z']) = ['z':-1:'a', 'Z':-1:'A'];
out = lut(in);