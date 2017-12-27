This repository inspects Node.js's modules based on ECMAScript.

## environment
Node.js: v8.9.3(15/12/2017)

## exec *.mjs
`$ npm start src/to/path`

### Node.jsの子プロセスについて

* spawn
  * ストリーム
  * 非同期
* fork
  * ストリーム
  * 他のNodeコマンドを実行
* exec
  * バッファ終了まで待機
  * 同期
  * シェルコマンドを実行
* execFile
  * バッファ終了まで待機
  * 同期
  * 実行形式ファイルを実行

バッファがあふれることもある。引数としてバッファ値を任意に設定することが可能