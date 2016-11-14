## 自动更新package.json的version

提交git的时候自动根据传入的参数，来更新版本，包括patch版本，表示Bug修复及小功能添加，minor表示小版本多个问题或功能的完善，major表示大版本

## 安装使用

```
npm install -g updv
```

可选参数-m表示提交git的注释
```
updv patch -m 'Bug修复及小功能添加'
updv minor -m '小版本多个问题或功能的完善'
updv major -m '大版本'
```
