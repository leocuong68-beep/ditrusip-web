import os,re,sys,shutil
src,root=sys.argv[1],sys.argv[2]
shutil.rmtree(root,ignore_errors=True); shutil.copytree(src,root)
for f in ['_redirects','robots.txt']:
    if os.path.exists(os.path.join(root,f)): os.remove(os.path.join(root,f))
def rel(frm,target):
    t=target.split('#')[0].split('?')[0]; frag=target[len(target.split('#')[0]):]
    path=t.strip('/')
    dest=os.path.join(root,path,'index.html') if path else os.path.join(root,'index.html')
    if not os.path.exists(dest):
        if path and os.path.isfile(os.path.join(root,path)): dest=os.path.join(root,path)
        else: return None
    return os.path.relpath(dest,os.path.dirname(frm))+frag
miss=set()
for d,_,fs in os.walk(root):
    for f in fs:
        if not f.endswith('.html'): continue
        p=os.path.join(d,f); s=open(p).read()
        def rep(m):
            r=rel(p,m.group(1))
            if r is None: miss.add(m.group(1)); return m.group(0)
            return f'href="{r}"'
        s=re.sub(r'href="(/(?!/)[^"]*)"',rep,s)
        s=s.replace('<head>','<head><meta name="robots" content="noindex">',1)
        open(p,'w').write(s)
print('unresolved',sorted(miss))
